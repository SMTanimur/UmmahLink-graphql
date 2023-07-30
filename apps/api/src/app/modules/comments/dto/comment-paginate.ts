import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import { PhotosImageInput } from '../../posts/entities/post';

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
export class CommentPaginate {
  @Field(() => [PhotosImageInput], { nullable: true })
  photos: PhotosImageInput[];

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

  @Field(() => Int, { nullable: true })
  likesCount: number;

  @Field(() => String, { nullable: true })
  id: string;
}

@ObjectType()
export class CommentPagination extends Paginated(CommentPaginate) {}
@ObjectType()
export class CommentResponse{
  @Field(() => [CommentPaginate])
  docs:CommentPaginate[]

  
  @Field(() => Number,{nullable:true})
  next:number
}




