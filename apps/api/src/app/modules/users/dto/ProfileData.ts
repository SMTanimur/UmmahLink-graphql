import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
// import { UserInfo } from "../entities/user.entity";




@ObjectType()
export class ProfileInformation {
  
  @Field(() => ID)
  id:string

  @Field(() => String)
  username:string

  @Field(() => String)
  name:string

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date;


  @Field(() => String,{nullable:true})
  gender: string


  @Field(()=>String,{ nullable: true })
  bio: string;

  @Field(()=>String,{ nullable: true })
  contact?: string;

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

  @Field(() =>Boolean)
  isFollowing:boolean

}
