import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Post, PostSchema } from './entities/post';
import { PostResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';
import { Like, LikeSchema } from './entities/like';
import {
  Notification,
  NotificationSchema,
} from '../notification/entities/notification';
import { Follow, FollowSchema } from '../follows/entities/follow';
import { NewsFeed, NewsFeedSchema } from '../newsFeed/entities/newsFeed';
import { User, UserSchema } from '../users/entities/user.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Follow.name, schema: FollowSchema },
      { name: User.name, schema: UserSchema },
      { name: NewsFeed.name, schema: NewsFeedSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    UsersModule,
    UploadModule,
  ],
  controllers: [],
  providers: [PostsService, PostResolver],
  exports: [PostsService],
})
export class PostsModule {}
