import { Field,  GraphQLISODateTime,  ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
// import { UserInfo } from '../../users/entities/user.entity';
import { UserInformation } from '../../users/dto/user';


@ObjectType()
export class Pagination {
  
  @Field(() => String,{nullable:true})
  username: string;

  @Field(() => String)
  name:string

  @Field(() => String)
  avatar:string

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date;

  @Field(() => String,{nullable:true})
  gender: string

  @Field(()=>String,{ nullable: true })
  bio: string;

  @Field(()=>String,{ nullable: true })
  contact?: string;
  
  @Field(() => String)
  id:string

  @Field(() => String)
  email:string

  @Field(() =>Boolean)
  isFollowing:boolean

}


@ObjectType()
export class FollowPagination extends Paginated(Pagination) {}






