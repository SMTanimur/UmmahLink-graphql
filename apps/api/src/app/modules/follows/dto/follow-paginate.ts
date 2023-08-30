import { Field,  GraphQLISODateTime,  ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import { AvatarImage } from '../../users/dto/ProfileData';



@ObjectType()
export class Pagination {
  
  @Field(() => String,{nullable:true})
  username: string;

  @Field(() => String)
  name:string

  @Field(() => AvatarImage)
  avatar:AvatarImage | string

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date;

  @Field(() => String,{nullable:true})
  gender: string

  @Field(()=>String,{ nullable: true })
  bio: string;

  @Field(()=>Boolean,{nullable:true})
  isActive: boolean

  @Field(()=>String,{ nullable: true })
  contact?: string;
  
  @Field(() => String)
  id:string

  @Field(() => String)
  email:string

  @Field(() => Date,{nullable:true})
  lastActive: Date;

  @Field(() =>Boolean)
  isFollowing:boolean

}


@ObjectType()
export class FollowPagination extends Paginated(Pagination) {}






