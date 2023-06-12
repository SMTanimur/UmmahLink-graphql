import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UploadModule } from './modules/upload/upload.module';
import { InfoModule } from './modules/Info/Info.module';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile:join(process.cwd(), 'apps/api/src/graphql/schema.gql'),
      // process.env.NODE_ENV === 'development'
      // ? join(process.cwd(), 'apps/api/src/schema.gql')
      // : true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
      sortSchema: true,
    }),
    UsersModule,
    UploadModule,
    InfoModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
