import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CurrentUser, MessageResponse } from '@social-zone/common';
import { Post } from './entities/post';
import { CreatePostInput } from './dto/craete-post-input';
import { PostsService } from './posts.service';
import { UpdatePostInput } from './dto/update-post-input';
import { DeletePostInput } from './dto/delete-post-input';


@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostsService) {}

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async createPost(
    @CurrentUser() user: any,
    @Args('createPostInput')
    createPostInput: CreatePostInput
  ) {
    createPostInput.author = user._id;
    return await this.postService.createPost(createPostInput);
  }

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async updatePost(
    @CurrentUser() user: any,
    @Args('updatePostInput')
    updatePostInput: UpdatePostInput
  ) {
    updatePostInput.user = user._id;
    return await this.postService.updatePost(updatePostInput);
  }
  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async deletePost(
    @CurrentUser() user: any,
    @Args('updatePostInput')
    deletePostInput: DeletePostInput
  ) {
    deletePostInput.user = user._id;
    return await this.postService.updatePost(deletePostInput);
  }

  @Query(() => Post, { name: 'post' })
  @UseGuards(AuthenticatedGuard)
  async getPost(@Args('postId', { type: () => ID }) postId: string) {
    return await this.postService.getPostById(postId);
  }
}
