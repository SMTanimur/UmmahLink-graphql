/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql";





@InputType()
export class CreateFriendRequestInput {
  @Field((_type) =>ID, { nullable: true })
  user: string

 
  @Field((_type) => ID, { nullable: true })
  target:string
}

