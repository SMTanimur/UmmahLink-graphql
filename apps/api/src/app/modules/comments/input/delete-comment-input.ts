/* eslint-disable @typescript-eslint/no-unused-vars */


import { Field, ID, InputType } from "@nestjs/graphql";

@InputType({isAbstract:true})
export class DeleteCommentInput {

 @Field((_type) => ID)
  commentId: string

  @Field((_type) => ID,{nullable:true})
  userID: string
}