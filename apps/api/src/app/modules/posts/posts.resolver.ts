import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CurrentUser, MessageResponse, PaginateOptionArgs } from '@social-zone/common';
import { Post } from './entities/post';
import { CreatePostInput } from './dto/craete-post-input';
import { PostsService } from './posts.service';
import { UpdatePostInput } from './dto/update-post-input';
import { DeletePostInput } from './dto/delete-post-input';
import { CreatePostOrCommentLikeInput } from './dto/create-post-or-comment-like';
import { NewsFeedPagination } from '../newsFeed/dto/newsFeed-paginate';
import { NewsFeedQueryArgs } from '../newsFeed/dto/newsFeed-query-arg';
import { GetLikeResponse, LikesQueryArgs } from './dto/getLike-dto';
import { GetFeedDto } from '../newsFeed/dto/optionArgs';




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
    createPostInput._author_id = user._id;
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
    @Args('deletePostInput')
    deletePostInput: DeletePostInput
  ) {
    deletePostInput.user = user._id;
    return await this.postService.deletePost(deletePostInput);
  }

  @Query(() => Post, { name: 'post' })
  @UseGuards(AuthenticatedGuard)
  async getPost(@Args('postId', { type: () => ID }) postId: string) {
    return await this.postService.getPostById(postId);
  }

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async likeOrUnlikePost(
    @CurrentUser() user: any,
    @Args('likeOrUnlikePostInput')
    likeOrUnlikePostInput:CreatePostOrCommentLikeInput
  ) {
    likeOrUnlikePostInput.user = user._id;
    likeOrUnlikePostInput.type = 'Post'
    return await this.postService.likePost(likeOrUnlikePostInput);
  }


  @UseGuards(AuthenticatedGuard)
  @Query(() =>NewsFeedPagination ,{name:'getPosts'})
  async  getPosts(
    @Args('username', { type: () => String }) username: string,
    @Args('query') query: NewsFeedQueryArgs,
    @Args('option') options: GetFeedDto,
    @CurrentUser() user: any,
  ) {
    query.user = user
    return await this.postService.getPosts(username,query, options);
  }
  @UseGuards(AuthenticatedGuard)
  @Query(() =>[GetLikeResponse] ,{name:'getPostLikes'})
  async  getPostLikes(
    
    @Args('query') query: LikesQueryArgs,
    @Args('option') options: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
    query.user = user._id
    return await this.postService.getPostLikes(query, options);
  }
}
