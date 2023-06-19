import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Comment, CommentSchema } from './entities/comment';
import { CommentResolver } from './comments.resolver';
import { Post, PostSchema } from '../posts/entities/post';
import { Notification, NotificationSchema } from '../notification/entities/notification';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Post.name, schema: PostSchema },
      { name: Notification.name, schema: NotificationSchema }
    ]),
  ],
  controllers: [],
  providers: [CommentsService, CommentResolver],
})
export class CommentsModule {}
