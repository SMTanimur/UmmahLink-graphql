import { Field, ID, InputType } from "@nestjs/graphql";




@InputType({isAbstract:true})
export class NotificationUpdateArgs {
  @Field((_type) => ID )
  notifiId: string;

  @Field((_type)=>Boolean,{defaultValue:false})
  unread?:boolean
}