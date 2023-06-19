import { Field, ID, InputType } from "@nestjs/graphql";




@InputType({isAbstract:true})
export class NotificationQueryArgs {
  @Field((_type) => ID,{nullable:true} )
  user: string;

}