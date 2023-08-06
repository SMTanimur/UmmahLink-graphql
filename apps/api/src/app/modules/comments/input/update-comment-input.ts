import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { Comment } from "../entities/comment";





@InputType()
export class UpdateCommentInput extends PartialType(Comment, InputType) {
  @Field((_type) => ID,{nullable:true} )
  user: string

  @Field((_type)=>ID)
  commentId:string
}