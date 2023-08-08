/* eslint-disable @typescript-eslint/no-explicit-any */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment';
import { CommentsService } from './comments.service';
import { CurrentUser, MessageResponse, PaginateOptionArgs } from '@social-zone/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UseGuards } from '@nestjs/common';
import { CreateCommentInput } from './input/create-comment-input';
import { CreateReplyInput } from './input/create-comment-replay-input';
import { DeleteCommentInput } from './input/delete-comment-input';
import { CommentPagination } from './dto/comment-paginate';
import { CommentsQueryArgs } from './dto/comment-query-arg';
import { UpdateCommentInput } from './input/update-comment-input';
import { ReplyQueryArgs } from './dto/reply-query-arg';
import { CreatePostOrCommentLikeInput } from '../posts/dto/create-post-or-comment-like';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentsService) {}

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async createComment(
    @CurrentUser() user: any,
    @Args('createCommentInput')
    createCommentInput: CreateCommentInput
  ) {
    createCommentInput.authId = user._id;
    console.log(createCommentInput)
    return await this.commentService.createComment(createCommentInput);
  }
  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async updateComment(
    @CurrentUser() user: any,
    @Args('updateCommentInput')
    updateCommentInput: UpdateCommentInput
  ) {
    updateCommentInput.user = user._id;
    return await this.commentService.updateComment(updateCommentInput);
  }

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async createCommentReply(
    @CurrentUser() user: any,
    @Args('createReplyInput')
    createReplyInput: CreateReplyInput
  ) {
    createReplyInput.userId = user._id;
    return await this.commentService.createReply(createReplyInput);
  }

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async deleteComment(
    @CurrentUser() user: any,
    @Args('deleteCommentInput')
    deleteCommentInput: DeleteCommentInput
  ) {
    deleteCommentInput.userID = user._id;
    return await this.commentService.deleteComment(deleteCommentInput);
  }

  @UseGuards(AuthenticatedGuard)
  @Query(() =>CommentPagination ,{name:'getComments',nullable:true})
  async  getComments(
    @Args('query') query: CommentsQueryArgs,
    @Args('option') option: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
  
    query.user = user
  return await this.commentService.getComments(query, option);

  
  }
  @UseGuards(AuthenticatedGuard)
  @Query(() =>CommentPagination ,{name:'getReplies',nullable:true})
  async  getReplies(
    @Args('query') query: ReplyQueryArgs,
    @Args('option') options: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
  
    query.user = user
  
    return await this.commentService.getReplies(query, options);
  }


  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async likeOrUnlikeComment(
    @CurrentUser() user: any,
    @Args('likeOrUnlikeCommentInput')
    likeOrUnlikePostInput:CreatePostOrCommentLikeInput
  ) {
    likeOrUnlikePostInput.user = user._id;
    likeOrUnlikePostInput.type = 'Comment'
    return await this.commentService.likeOnComment(likeOrUnlikePostInput);
  }
}
