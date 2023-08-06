import { Field, ID, InputType } from "@nestjs/graphql";

import { User } from "../../users/entities/user.entity";




@InputType({isAbstract:true})
export class ReplyQueryArgs {

  @Field((_type) => User,{nullable:true} )
  user: User

  @Field((_type) => ID )
  comment_id: string

  @Field((_type) => ID )
  post_id: string
}