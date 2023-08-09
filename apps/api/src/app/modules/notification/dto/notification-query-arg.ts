import { Field, ID, InputType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";




@InputType({isAbstract:true})
export class NotificationQueryArgs {
  @Field((_type) => User,{nullable:true} )
  user: User


  @Field((_type)=>String,{nullable:true})
  type?:string

  @Field((_type)=>Boolean,{nullable:true})
  unread?:boolean
}
@InputType()
export class NotificationCountQueryArgs {
  @Field((_type) => User,{nullable:true} )
  user: User
}