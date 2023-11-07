import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Follow } from "./entities/follow";
import { FollowsService } from "./follows.service";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, MessageResponse, PaginateOptionArgs } from "@social-zone/common";
import { FollowOrUnFollowInput } from "./input/followerUnfollowInput";
import { FollowPagination, Pagination } from "./dto/follow-paginate";
import { FollowQueryArgs } from "./dto/follow-query-arg";
import { GqlAuthGuard } from "../auth/guards/auth.guard";



@Resolver(() => Follow)
export class FollowsResolver {
  constructor(private readonly followService: FollowsService) {}

  
  @UseGuards(GqlAuthGuard )
  @Mutation(()=>MessageResponse)
  async followUser(@Args('followOrUnFollowInput') followOrUnFollowInput: FollowOrUnFollowInput,  @CurrentUser() user: any) {
     followOrUnFollowInput.userId =user._id
    return await this.followService.followUser(followOrUnFollowInput);
  }

  @UseGuards(GqlAuthGuard )
  @Mutation(()=>MessageResponse)
  async unFollowUser(@Args('followOrUnFollowInput') followOrUnFollowInput: FollowOrUnFollowInput,  @CurrentUser() user: any) {
     followOrUnFollowInput.userId =user._id
    return await this.followService.unfollowUser(followOrUnFollowInput)
  }


  @UseGuards(GqlAuthGuard )
  @Query(() => FollowPagination,{name:'getFollowers'})
  async  getFollowers(
    @Args('username', { type: () => String }) username: string,
    @Args('query') query: FollowQueryArgs,
    @Args('option') options: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
    query.user = user
    query.type = 'followers'
    return await this.followService.getFollowers(username,query, options);
  }
  @UseGuards(GqlAuthGuard )
  @Query(() => FollowPagination,{name:'getFollowing'})
  async  getFollowing(
    @Args('username', { type: () => String }) username: string,
    @Args('query') query: FollowQueryArgs,
    @Args('option') options: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
    query.user = user;
    query.type = 'following'
    return await this.followService.getFollowers(username,query, options);
  }

  @UseGuards(GqlAuthGuard )
  @Query(() =>FollowPagination ,{name:'getSuggestionPeople',nullable:true})
  async  getSuggestionPeople(
    @Args('query') query: FollowQueryArgs,
    @Args('option') options: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
    query.user = user
    return await this.followService.getPeopleSuggestions(query, options);
  }



  
}
