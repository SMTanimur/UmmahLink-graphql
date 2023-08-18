import { Field, InputType, PickType } from "@nestjs/graphql";
import { Message } from "../entities/message";
import { User, UserDocument } from "../../users/entities/user.entity";




@InputType()
export class CreateMessageInput extends PickType(
  Message,
  ['text'],
  InputType
) {
  
  @Field(()=>String)
  user_id:string

  @Field(()=>User,{nullable:true})
  user:UserDocument
}