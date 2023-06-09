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
import { DeleteCommentInput } from './input/delete-comment-input';

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

      if (String(post._author_id) !== String(authId)) {
        await this.notificationModel.create({
          type: 'comment',
          target: post._author_id,
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
          target: post._author_id,
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

  async deleteComment(deleteCommentInput: DeleteCommentInput) {
    try {
      const { commentId, userID } = deleteCommentInput;

      const comment = await this.commentModel.findOne({ _id: commentId });
      if (!comment) throw new NotFoundException('Comment not found');

      // FIND THE POST TO GET AUTHOR ID
      const post = await this.postModel.findOne({ _id: comment.postId });

      const postAuthorID = post._author_id.toString();
      const commentAuthorID = comment.authId.toString();

      if (postAuthorID == userID || commentAuthorID == userID) {
        await this.commentModel.deleteMany({
          $or: [{ _id: commentId }, { parents: { $in: [commentId] } }],
        });
      }
      return {
        message: `Comment successfully deleted`,
      }
    } catch (error) {
      console.log(error);
    }
  }
}
