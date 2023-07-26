import { Field, ID, InputType } from "@nestjs/graphql";

import { User } from "../../users/entities/user.entity";




@InputType({isAbstract:true})
export class CommentsQueryArgs {

  @Field((_type) => User,{nullable:true} )
  user: User
}