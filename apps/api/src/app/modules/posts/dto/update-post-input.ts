import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { Post } from "../entities/post";



@InputType()
export class UpdatePostInput extends PartialType(Post, InputType) {
  @Field((_type) => ID,{nullable:true} )
  user: string;

  @Field((_type)=>ID)
  postId:string
}