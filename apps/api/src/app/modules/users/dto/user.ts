import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Info } from "../../Info/entities/info"



@ObjectType()
export class IUser {
  
  @Field(() => ID)
  _id:string

  @Field(() => String)
  username:string

  @Field(() => String)
  name:string

  @Field(()=> Info,{nullable:true})
  info:Info

  @Field(() => String)
  avatar:string

  @Field(() => String,{nullable:true})
  email:string

  @Field(()=>String,{nullable:true})
  coverPicture:string

  @Field(()=>Date,{nullable:true})
  dateJoined:Date

  @Field(() =>Boolean)
  isFollowing:boolean

}