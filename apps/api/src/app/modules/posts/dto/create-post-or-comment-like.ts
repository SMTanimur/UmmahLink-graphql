import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { Post } from "../entities/post";



@InputType()
export class CreatePostOrCommentLikeInput {
  @Field((_type) => ID,{nullable:true} )
  user: string;

  @Field((_type)=>ID,{nullable:true})
  postId?:string

  @Field((_type)=>String,{nullable:true})
  type?:string
}