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

  @Field(() => Boolean, { nullable: true })
  isActive: boolean;

  @Field(() => Date, { nullable: true })
  lastActive: Date;

  @Field(() => String)
  email: string;

  @Field(() => AvatarImage, { nullable: true })
  avatar: AvatarImage;

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

  @Field(() => Author, { nullable: true })
  author: Author;

  @Field(() => Boolean)
  isLiked: boolean;

  @Field(() => Boolean)
  isOwnPost: boolean;

  @Field(() => Number)
  commentsCount: number;

  @Field(() => Number)
  likesCount: number;

  @Field(() => String, { nullable: true })
  id: string;
}

@ObjectType()
export class NewsFeedPagination extends Paginated(NewsFeedPaginate) {}
