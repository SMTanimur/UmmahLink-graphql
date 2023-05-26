/*
https://docs.nestjs.com/modules
*/

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule, DatabaseModule } from '@social-zone/common';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    PassportModule.register({ session: true }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,// Set this manually if NODE_ENV=production
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/graphql/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'libs/types/src/graphql/index.ts'),
      },
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
