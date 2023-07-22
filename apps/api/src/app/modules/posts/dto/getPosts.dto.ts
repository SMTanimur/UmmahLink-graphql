import { Field, ObjectType } from "@nestjs/graphql"
import { NewsFeedPaginate } from "../../newsFeed/dto/newsFeed-paginate"

@ObjectType()
export class PostsResponse{
  @Field(() => [NewsFeedPaginate])
  docs:NewsFeedPaginate[]

  @Field(() => Number,{nullable:true})
  next:number
}