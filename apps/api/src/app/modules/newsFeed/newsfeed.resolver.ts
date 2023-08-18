import { Args, Query, Resolver } from "@nestjs/graphql";
import { NewsFeed } from "./entities/newsFeed";
import { NewsFeedService } from "./newsfeed.service";
import { UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import {  NewsFeedPagination} from "./dto/newsFeed-paginate";
import { NewsFeedQueryArgs } from "./dto/newsFeed-query-arg";
import { CurrentUser } from "@social-zone/common";
import { GetFeedDto } from "./dto/optionArgs";




@Resolver(() =>NewsFeed )
export class NewsFeedResolver {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  @UseGuards(AuthenticatedGuard)
  @Query(() =>NewsFeedPagination ,{name:'getFeeds'})
  async  getSuggestionPeople(
    @Args('query') query: NewsFeedQueryArgs,
    @Args('option') options: GetFeedDto,
    @CurrentUser() user: any,
  ) {
  
    query.user = user
    return await this.newsFeedService.getFeeds(query, options);
  }
}
