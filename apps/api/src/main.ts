import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigurationService } from '@social-zone/common';
import passport from 'passport';
import MongoDBStore from 'connect-mongodb-session';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

const MongoStore = MongoDBStore(session);
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const configurationService =
      app.get<ConfigurationService>(ConfigurationService);
    const __prod__ = process.env.NODE_ENV === 'production';

    app.enableCors({
      origin: [configurationService.WEB_URL, 'http://localhost:4200'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    if (__prod__) {
      app.set('trust proxy', 1); // trust first cookie

      // Enable cors middleware
      app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', configurationService.WEB_URL); // update to match the domain you will make the request from
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
        );
        res.header(
          'Access-Control-Allow-Methods',
          'GET,POST,PUT,PATCH,DELETE, OPTIONS'
        );
        res.header('Access-Control-Allow-Credentials', true);
        if (req.method === 'OPTIONS') {
          return res.sendStatus(204);
        }
        next();
      });

      // Disable console.log() in production
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      console.log = function () {};
    }

    // Express session configuration
    app.use(
      session({
        name: configurationService.SESSION_NAME,
        secret: configurationService.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        proxy: true, // add this when behind a reverse proxy, if you need secure cookies
        cookie: {
          httpOnly: true,
          secure: __prod__,
          maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
          sameSite: __prod__ ? 'none' : 'lax',
          domain: __prod__ ? '.ummah-link-graphql.vercel.app' : undefined,
        },
        store: new MongoStore({
          uri: configurationService.MONGODB_URI,
          collection: 'sessions',
          expires: 30 * 24 * 60 * 60 * 1000, // 30 days
        }),
      })
    );
    // Passport configuration
    app.use(passport.initialize());
    app.use(passport.session());

    // app.useGlobalFilters(new NestHttpExceptionFilter(configurationService));

    const port = process.env.PORT || 5000;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: ${await app.getUrl()}/graphql`);
  } catch (error) {
    Logger.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
}
bootstrap();
