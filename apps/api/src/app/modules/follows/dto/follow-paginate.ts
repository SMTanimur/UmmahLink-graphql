import { Field, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import { Info } from '../../Info/entities/info';


@ObjectType()
export class Pagination {
  
  @Field(() => String,{nullable:true})
  username: string;

  @Field(() => String)
  name:string

  @Field(() => String)
  avatar:string

  @Field(() => Info,{nullable:true})
  info:Info

  @Field(() => String)
  id:string

  @Field(() => String)
  email:string

  @Field(() =>Boolean)
  isFollowing:boolean

}


@ObjectType()
export class FollowPagination extends Paginated(Pagination) {}






