import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';

@ObjectType()
export class Author {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatar: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class NewsFeedPaginate {
  @Field(() => [String], { nullable: true })
  photos: string[];

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => Author)
  author: Author;

  @Field(() => Boolean, { nullable: true })
  isLiked: boolean;

  @Field(() => Boolean, { nullable: true })
  isOwnPost: boolean;

  @Field(() => Number, { nullable: true })
  commentsCount: number;

  @Field(() => Number, { nullable: true })
  likesCount: number;

  @Field(() => String, { nullable: true })
  id: string;
}

@ObjectType()
export class NewsFeedPagination extends Paginated(NewsFeedPaginate) {}
@ObjectType()
export class NewsFeedResponse{
  @Field(() => [NewsFeedPaginate])
  docs:NewsFeedPaginate[]

  
  @Field(() => Number,{nullable:true})
  next:number
}




