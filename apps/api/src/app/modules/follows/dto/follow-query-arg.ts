import { Field, ID, InputType } from "@nestjs/graphql";
import {  IsOptional } from "class-validator";




@InputType({isAbstract:true})
export class FollowQueryArgs {

  @Field((_type) => ID,{nullable:true} )
  user: string;

  @Field((_type) => ID,{nullable:true} )
  @IsOptional()
  target: string;

  @Field((_type) => String,{nullable:true} )
  type?: string;

}