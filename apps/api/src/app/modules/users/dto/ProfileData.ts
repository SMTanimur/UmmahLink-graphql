import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Info } from "../../Info/entities/info";



@ObjectType()
export class ProfileInformation {
  
  @Field(() => ID)
  id:string

  @Field(() => String)
  username:string

  @Field(() => String)
  name:string

  @Field(()=> Info,{nullable:true})
  info:Info

  @Field(() => String)
  avatar:string

  @Field(() => String)
  email:string

  @Field(()=>String,{nullable:true})
  coverPicture:string

  @Field(()=>Number,{nullable:true})
  followingCount:number

  @Field(()=>Number,{nullable:true})
  followersCount:number
  
  @Field(()=>Date,{nullable:true})
  dateJoined:Date

  @Field(() =>Boolean)
  isFollowing:boolean

}
