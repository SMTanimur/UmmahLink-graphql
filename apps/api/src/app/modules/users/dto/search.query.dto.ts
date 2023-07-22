import { Field, InputType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";



@InputType({isAbstract:true})
export class SearchDto  {
  @Field(() => String)
  keyword:string

  @Field((_type) => User,{nullable:true} )
  user: User

}