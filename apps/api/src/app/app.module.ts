import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile:join(process.cwd(), 'apps/api/src/schema.gql'),
      // process.env.NODE_ENV === 'development'
      // ? join(process.cwd(), 'apps/api/src/schema.gql')
      // : true,
      debug: process.env.NODE_ENV !== 'production',
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      cors: {
        credentials: true,
        origin: true,
      },
      sortSchema: true,
    }),
    UsersModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
