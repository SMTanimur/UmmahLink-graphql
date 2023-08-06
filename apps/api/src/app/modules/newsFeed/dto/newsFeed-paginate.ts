import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import { AvatarImage } from '../../users/dto/ProfileData';
import { PhotosImageInput } from '../../posts/entities/post';

@ObjectType()
export class Author {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => AvatarImage)
  avatar: AvatarImage | string

  @Field(() => String)
  name: string;
}

@ObjectType()
export class NewsFeedPaginate {
  @Field(() => [PhotosImageInput], { nullable: true })
  photos: PhotosImageInput[];

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => Author,{nullable:true})
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





