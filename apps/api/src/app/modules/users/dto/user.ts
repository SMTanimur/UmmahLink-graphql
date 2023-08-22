import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { AvatarImage, CoverImage } from './ProfileData';
// import { UserInfo } from "../entities/user.entity"

export class UserInformation {
  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date;

  @Field(() => String)
  gender: string;

  @Field(() => Boolean,{nullable:true})
  isActive: boolean;

  @Field(() => Date,{nullable:true})
  lastActive: Date;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  contact?: string;
}

@ObjectType()
export class IUser {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  lastActive?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date;

  @Field(() => String, { nullable: true })
  gender: string;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  contact?: string;

  @Field(() => AvatarImage)
  avatar: AvatarImage | string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => CoverImage, { nullable: true })
  coverPicture: CoverImage | string;

  @Field(() => Boolean)
  isFollowing: boolean;
}
