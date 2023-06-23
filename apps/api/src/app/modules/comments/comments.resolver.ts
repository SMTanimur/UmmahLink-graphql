/* eslint-disable @typescript-eslint/no-explicit-any */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment';
import { CommentsService } from './comments.service';
import { CurrentUser, MessageResponse } from '@social-zone/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UseGuards } from '@nestjs/common';
import { CreateCommentInput } from './input/create-comment-input';
import { CreateReplyInput } from './input/create-comment-replay-input';
import { DeleteCommentInput } from './input/delete-comment-input';

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
    return await this.commentService.createComment(createCommentInput);
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
}
