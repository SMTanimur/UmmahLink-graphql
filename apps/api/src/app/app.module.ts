import { MessagesModule } from './modules/messages/messages.module';

import { NewsFeedModule } from './modules/newsFeed/newsfeed.module';
import { CommentsModule } from './modules/comments/comments.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PostsModule } from './modules/posts/posts.module';
import { FriendRequestsModule } from './modules/friendRequest/friendrequests.module';
import { FollowsModule } from './modules/follows/follows.module';
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

@Module({
  imports: [
    MessagesModule,
    NewsFeedModule,
    CommentsModule,
    NotificationModule,
    PostsModule,
    FollowsModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/graphql/schema.gql'),
      // process.env.NODE_ENV === 'development'
      // ? join(process.cwd(), 'apps/api/src/schema.gql')
      // : true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => ({ req, res }),
      // cors: {
      //   credentials: true,
      //   origin: true,
      // },
      // sortSchema: true,
    }),
    UsersModule,
    CoreModule,
    UploadModule,
    FriendRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
