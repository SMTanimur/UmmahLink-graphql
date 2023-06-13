import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export class CloseRequestInput {

  @Field((_type) => ID,{nullable:true})
  target:string 

  @Field(()=>String)
 status:string

}