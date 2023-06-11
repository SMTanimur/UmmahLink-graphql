/*
------------------------------------------------------------------------------ 
Author: devhoangkien 
Website: https://devhoangkien.com
------------------------------------------------------------------------------
*/

import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ResponseSingleUpload {
 
  @Field(() => String)
  url!: string;


  @Field(() => String)
  format!: string;


  @Field(() => String)
  folder!: string;


  @Field(() => Number)
  width!: number;
  

  @Field(() => Number)
  height!: number;


  @Field(() => Number)
  bytes!: number;
  
}
