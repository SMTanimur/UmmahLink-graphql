import { Field, ID, InputType } from "@nestjs/graphql";


@InputType()
export class DeletePostInput{
  @Field((_type) => ID,{nullable:true} )
  user: string;

  @Field((_type)=>ID)
  postId:string
}