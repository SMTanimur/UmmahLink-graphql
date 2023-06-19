import { create } from 'zustand';
/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment';
import { PaginateModel } from 'mongoose';
import { Post, PostDocument } from '../posts/entities/post';
import {
  Notification,
  NotificationDocument,
} from '../notification/entities/notification';
import { CreateCommentInput } from './input/create-comment-input';
import { CreateReplyInput } from './input/create-comment-replay-input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: PaginateModel<CommentDocument>,
    @InjectModel(Post.name) private postModel: PaginateModel<PostDocument>,
    @InjectModel(Notification.name)
    private notificationModel: PaginateModel<NotificationDocument>
  ) {}

  async createComment(createCommentInput: CreateCommentInput) {
    try {
      const { postId, body, authId } = createCommentInput;
      const post = await this.postModel.findOne({ _id: postId });
      if (!post) throw new NotFoundException('Post not found');
      const comment = await this.commentModel.create({
        postId: post._id,
        body,
        authId,
      });
      await comment.save();
      await comment.populate({
        path: 'authId',
        select: 'username avatar name',
      });

      await this.postModel.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: comment._id },
        },
        { new: true }
      );

      if (String(post.author) !== String(authId)) {
        await this.notificationModel.create({
          type: 'comment',
          target: post.author,
          initiator: authId,
          link: `/post/${postId}`,
        });
      }

      return {
        message: `Comment successfully added`,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating comment');
    }
  }

  async createReply(createReplayInput: CreateReplyInput) {
    try {
      const { body, commentId, postId, userId } = createReplayInput;

      const comment = await this.commentModel.findOne({ _id: commentId });
      if (!comment)
        throw new NotFoundException('Unable to reply. Comment not found.');

      const post = await this.postModel.findOne({ _id: postId });
      if (!post) throw new NotFoundException('Unable to reply. Post not found');

      const reply = await this.commentModel.create({
        postId: comment.postId,
        body,
        authId: userId,
        parent: comment._id,
        parents: [...comment.parents, comment._id],
        depth: comment.depth + 1,
      });

      if (String(comment.authId) !== String(userId)) {
        const notify = await this.notificationModel.create({
          type: 'comment',
          target: post.author,
          initiator: userId,
          link: `/post/${postId}`,
        });

        await notify.save().then(async (notify) => {
          await notify.populate({
            path: 'initiator',
            select: 'username avatar name',
          });
        });
      }
      await reply.save();

      return {
        message: `Reply successfully added`,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
