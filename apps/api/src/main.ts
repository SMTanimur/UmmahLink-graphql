

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
          httpOnly: true,
                domain: process.env.NODE_ENV === "production" ? ".social-zone.vercel.app" : undefined,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
                sameSite:
                    process.env.NODE_ENV === "production" ? "strict" : "lax",
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
