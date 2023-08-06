import { Field, ID, InputType } from "@nestjs/graphql";




@InputType()
export class CreatePostOrCommentLikeInput {
  @Field((_type) => ID,{nullable:true} )
  user: string;

  @Field((_type)=>ID,{nullable:true})
  postId?:string
  
  @Field((_type)=>ID,{nullable:true})
  comment_id?:string

  @Field((_type)=>String,{nullable:true})
  type?:string
}