import { MongooseModule } from '@nestjs/mongoose';
import { FollowsService } from './follows.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Follow, FollowSchema } from './entities/follow';
import { FollowsResolver } from './follows.resolver';
import { User, UserSchema } from '../users/entities/user.entity';
import { Notification, NotificationSchema } from '../notification/entities/notification';
import { Post, PostSchema } from '../posts/entities/post';
import { NewsFeed, NewsFeedSchema } from '../newsFeed/entities/newsFeed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follow.name, schema: FollowSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: NewsFeed.name, schema: NewsFeedSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [],
  providers: [FollowsService, FollowsResolver],
})
export class FollowsModule {}
