import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigurationService } from '@social-zone/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const configurationService =
      app.get<ConfigurationService>(ConfigurationService);
    const __prod__ = process.env.MODE === 'production';

    app.enableCors({
      origin: [configurationService.WEB_URL, 'http://localhost:4200'],
      credentials: true,
    });

   

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
