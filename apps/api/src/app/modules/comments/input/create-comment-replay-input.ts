/* eslint-disable @typescript-eslint/no-unused-vars */


import { Field, ID, InputType } from "@nestjs/graphql";

@InputType({isAbstract:true})
export class CreateReplyInput {

  @Field((_type) => ID)
  _post_id: string

 
  @Field((_type) => ID, { nullable: true })
  userId: string;

  @Field((_type) => ID)
  commentId: string;


  @Field(() => String)
  body: string;

}