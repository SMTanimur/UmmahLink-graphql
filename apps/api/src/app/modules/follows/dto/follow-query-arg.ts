import { Field, ID, InputType } from "@nestjs/graphql";
import {  IsOptional } from "class-validator";
import { User } from "../../users/entities/user.entity";




@InputType({isAbstract:true})
export class FollowQueryArgs {

  @Field((_type) =>User,{nullable:true} )
  user: User

 
  @Field((_type) => String,{nullable:true} )
  type?: string;

}