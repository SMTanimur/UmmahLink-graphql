import { Field, ID, InputType } from "@nestjs/graphql";




@InputType({isAbstract:true})
export class NotificationQueryArgs {
  @Field((_type) => ID,{nullable:true} )
  user: string;

  @Field((_type)=>ID,{nullable:true})
  targetId?:string

  @Field((_type)=>String,{nullable:true})
  type?:string

  @Field((_type)=>Boolean,{nullable:true})
  unread?:boolean
}