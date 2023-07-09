import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

import { User } from "../../users/entities/user.entity";




@InputType({isAbstract:true})
export class LikesQueryArgs {

  @Field((_type) => ID,{nullable:true} )
  user: string

  @Field((_type) => ID,{nullable:true} )
  postId: string


  @Field((_type) => ID,{nullable:true} )
  commentId?: string


}



@ObjectType({isAbstract:true})
export class GetLikeResponse {

  @Field((_type) =>String)
  username:string

  @Field((_type) =>String)
  avatar:string

  @Field((_type) =>String)
  name:string

  @Field((_type) => Boolean )
  isFollowing: boolean


}