import { Resolver } from "@nestjs/graphql";
import { NewsFeed } from "./entities/newsFeed";
import { NewsFeedService } from "./newsfeed.service";




@Resolver(() =>NewsFeed )
export class NewsFeedResolver {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  
  
}
