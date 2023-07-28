

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigurationService } from '@social-zone/common';
import passport from 'passport';
import MongoDBStore from 'connect-mongodb-session';
import session from 'express-session';


const MongoStore = MongoDBStore(session);
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const configurationService =
      app.get<ConfigurationService>(ConfigurationService);

  // only using graphql
  // app.use((req: any, res: any, next: any) => {
  //   if (req.url.includes('/graphql')) {
  //     // only graphql request
  //     graphqlUploadExpress({
  //       maxFileSize: 100000000,
  //       maxFiles: 10,
  //     })(req, res, next);
  //   } else {
  //     next();
  //   }
  // });
    // app.use(morgan('common'));
    // app.use(helmet());
    app.enableCors({
      credentials: true,
      origin: [configurationService.WEB_URL],
    });

    // Express session configuration
    app.use(
      session({
        name: configurationService.SESSION_NAME,
        secret: configurationService.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          httpOnly: true,
          // TODO: Need to check when it's live on the production server
          // sameSite: ServerConfig.NODE_ENV !== 'production' ? 'none' : 'lax',
          sameSite: 'lax',
          // TODO: Enable secure cookie in production
          secure: false, //|| ServerConfig.NODE_ENV === 'production',
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
