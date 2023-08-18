import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

import { User } from "../../users/entities/user.entity";




@InputType({isAbstract:true})
export class MessageReadQueryArgs {

  @Field((_type) => User,{nullable:true} )
  user: User

  @Field((_type) => String )
  from_id: string

}



@ObjectType()
export class ReadCountResponse {

  @Field(()=>Boolean)
  state:boolean

}