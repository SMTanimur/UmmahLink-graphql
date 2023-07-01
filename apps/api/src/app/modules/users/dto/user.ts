import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql"
// import { UserInfo } from "../entities/user.entity"


export class UserInformation {
  

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date;


  @Field(() => String)
  gender: string


  @Field(()=>String,{ nullable: true })
  bio: string;

  @Field(()=>String,{ nullable: true })
  contact?: string;
}


@ObjectType()
export class IUser {
  
  @Field(() => ID)
  _id:string

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

  @Field(() => String,{nullable:true})
  email:string

  @Field(()=>String,{nullable:true})
  coverPicture:string


  @Field(() =>Boolean)
  isFollowing:boolean

}