import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import { PhotosImageInput } from '../../posts/entities/post';
import { AvatarImage } from '../../users/dto/ProfileData';

@ObjectType()
export class CommentAuthor {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => AvatarImage,{nullable:true})
  avatar:AvatarImage

  @Field(() => String)
  name: string;
}

@ObjectType()
export class CommentPaginate {

  @Field(() => String, { nullable: true })
  body: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => CommentAuthor)
  author: CommentAuthor

  @Field(() => Boolean, { nullable: true })
  isLiked: boolean;

  @Field(() => Boolean)
  isPostOwner: boolean;

  @Field(() => Boolean)
  isOwnComment: boolean;
  
  @Field(() => Boolean,{nullable:true})
  isEdited: boolean;

  @Field(() => Int)
  likesCount: number;
  
  @Field(() => Int)
  depth: number;

  @Field(() => Int)
  replyCount: number;

  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => ID, { nullable: true })
  post_id: string;
}

@ObjectType()
export class CommentPagination extends Paginated(CommentPaginate) {}
