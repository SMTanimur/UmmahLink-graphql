import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment';
import mongoose, {
  AggregateOptions,
  Model,
  PaginateModel,
  Types,
} from 'mongoose';
import { Post, PostDocument } from '../posts/entities/post';
import {
  Notification,
  NotificationDocument,
} from '../notification/entities/notification';
import { CreateCommentInput } from './input/create-comment-input';
import { CreateReplyInput } from './input/create-comment-replay-input';
import { DeleteCommentInput } from './input/delete-comment-input';
import { FilterQuery } from 'mongoose';
import { CommentsQueryArgs } from './dto/comment-query-arg';
import { AggregatePaginateModel } from 'mongoose';
import { CommentPagination } from './dto/comment-paginate';
import { UpdateCommentInput } from './input/update-comment-input';
import { ReplyQueryArgs } from './dto/reply-query-arg';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: AggregatePaginateModel<CommentDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>
  ) {}

  async createComment(createCommentInput: CreateCommentInput) {
    try {
      const { _post_id, body, authId } = createCommentInput;
      const post = await this.postModel.findOne({ _id: _post_id });
      if (!post) throw new NotFoundException('Post not found');
      const comment = await this.commentModel.create({
        _post_id: post._id,
        body,
        authId,
      });
      await comment.save();
      await comment.populate({
        path: 'authId',
        select: 'username avatar name',
      });

      await this.postModel.findOneAndUpdate(
        { _id: _post_id },
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
          link: `/post/${_post_id}`,
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

  async updateComment(updateCommentInput: UpdateCommentInput) {
    try {
      const { commentId, user, body } = updateCommentInput;
      const comment = await this.commentModel.findOne({ _id: commentId });
      if (!comment) throw new NotFoundException('Comment not found');
      const post = await this.postModel.findOne({ _id: comment._post_id });
      if (!post) throw new NotFoundException('Post not found');

      if (String(comment.authId) === String(user)) {
        const updateComment = await this.commentModel.findOneAndUpdate(
          { _id: commentId },
          {
            $set: {
              body,
              isEdit: true,
              updated_at: Date.now(),
            },
          },
          {
            new: true,
          }
        );

        await updateComment.save();
        return {
          message: `Comment successfully updated`,
        };
      } else {
        throw new BadRequestException(
          'You are not authorized to edit this comment'
        );
      }
    } catch (error) {
      throw new BadRequestException('Error updating comment');
    }
  }

  async createReply(createReplayInput: CreateReplyInput) {
    try {
      const { body, commentId, _post_id, userId } = createReplayInput;

      const comment = await this.commentModel.findOne({ _id: commentId });
      if (!comment)
        throw new NotFoundException('Unable to reply. Comment not found.');

      const post = await this.postModel.findOne({ _id: _post_id });
      if (!post) throw new NotFoundException('Unable to reply. Post not found');

      const reply = await this.commentModel.create({
        _post_id: comment._post_id,
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
          link: `/post/${_post_id}`,
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
      const post = await this.postModel.findOne({ _id: comment._post_id });

      const postAuthorID = post._author_id.toString();
      const commentAuthorID = comment.authId.toString();

      if (postAuthorID == userID || commentAuthorID == userID) {
        await this.commentModel.deleteMany({
          $or: [{ _id: commentId }, { parents: { $in: [commentId] } }],
        });
      }
      return {
        message: `Comment successfully deleted`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getComments(
    query?: FilterQuery<CommentsQueryArgs>,
    options?: AggregateOptions
  ) {
    try {
      const { postId, user } = query;

      const { limit, page } = options;

      const post = await this.postModel.findOne({ _id: postId });
      if (!post) throw new NotFoundException('Post not found');

      const agg = this.commentModel.aggregate([
        {
          $match: {
            _post_id: post._id,
            depth: 1,
          },
        },

        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'users',
            localField: 'authId',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $unwind: '$author',
        },
        {
          $project: {
            author: {
              username: '$author.username',
              email: '$author.email',
              avatar: '$author.avatar',
              id: '$author._id',
            },
            depth: '$depth',
            parent: '$parent',
            body: '$body',
            isEdited: '$isEdit',
            post_id: '$_post_id',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
        {
          $lookup: {
            from: 'comments',
            let: { id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$parent', '$$id'] },
                      { $eq: ['$depth', 2] },
                    ],
                  },
                },
              },
            ],
            as: 'replyCount',
          },
        },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'target',
            as: 'likes',
          },
        },
        {
          $addFields: {
            likesUserIDs: {
              $map: {
                input: '$likes',
                as: 'commentLike',
                in: '$$commentLike.user',
              },
            },
          },
        },
        {
          $addFields: {
            isOwnComment: {
              $eq: ['$author.id', user._id],
            },
            isLiked: {
              $in: [user?._id, '$likesUserIDs'],
            },
            isPostOwner: post._author_id.toString() == user._id.toString(),
          }, //user.id === comment.author.id || authorID === user.id)
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            depth: 1,
            parent: 1,
            author: 1,
            isEdited: 1,
            post_id: 1,
            createdAt: 1,
            updatedAt: 1,
            body: 1,
            isOwnComment: 1,
            isPostOwner: 1,
            isLiked: 1,
            replyCount: { $size: '$replyCount' },
            likesCount: { $size: '$likes' },
          },
        },
      ]);
      const res = await this.commentModel.aggregatePaginate(agg, {
        ...(limit ? { limit } : {}),
        ...(page ? { page } : {}),
      });

      if (res.docs.length === 0)
        throw new NotFoundException('No comments found');

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getReplies(
    query?: FilterQuery<ReplyQueryArgs>,
    options?: AggregateOptions
  ) {
    try {
      const { comment_id, user ,post_id} = query;

      const { limit, page } = options;

      const reply = await this.commentModel.findOne({ _id: comment_id});
      if (!reply) throw new NotFoundException('Reply not found');
      const post = await this.postModel.findOne({ _id: post_id });
      if (!post) throw new NotFoundException('Post not found');

      const agg = this.commentModel.aggregate([
        {
          $match: {
            parent: reply._id,
            depth: reply.depth +1,
          },
        },

        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'users',
            localField: 'authId',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $unwind: '$author',
        },
        {
          $project: {
            author: {
              username: '$author.username',
              email: '$author.email',
              avatar: '$author.avatar',
              id: '$author._id',
            },
            depth: '$depth',
            parent: '$parent',
            body: '$body',
            isEdited: '$isEdit',
            post_id: '$_post_id',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
        {
          $lookup: {
            from: 'comments',
            let: { id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                      $and: [
                          { $eq: ['$parent', '$$id'] },
                          { $eq: ['$depth', reply.depth + 2] }
                      ]
                  }
              }
              },
            ],
            as: 'replyCount',
          },
        },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'target',
            as: 'likes',
          },
        },
        {
          $addFields: {
            likesUserIDs: {
              $map: {
                input: '$likes',
                as: 'commentLike',
                in: '$$commentLike.user',
              },
            },
          },
        },
        {
          $addFields: {
            isOwnComment: {
              $eq: ['$author.id', user._id],
            },
            isLiked: {
              $in: [user?._id, '$likesUserIDs'],
            },
            isPostOwner: post._author_id.toString() == user._id.toString(),
          }, //user.id === comment.author.id || authorID === user.id)
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            depth: 1,
            parent: 1,
            author: 1,
            isEdited: 1,
            post_id: 1,
            createdAt: 1,
            updatedAt: 1,
            body: 1,
            isOwnComment: 1,
            isPostOwner: 1,
            isLiked: 1,
            replyCount: { $size: '$replyCount' },
            likesCount: { $size: '$likes' },
          },
        },
      ]);
      const res = await this.commentModel.aggregatePaginate(agg, {
        ...(limit ? { limit } : {}),
        ...(page ? { page } : {}),
      });

      // if (res.docs.length === 0)
      //   throw new NotFoundException('No comments found');

      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
