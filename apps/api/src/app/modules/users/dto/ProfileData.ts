import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
// import { UserInfo } from "../entities/user.entity";


@ObjectType({isAbstract:true})
export class AvatarImage {
  @Field(() => String,{nullable:true})
  avatarUrl: string;

  @Field(() => String,{nullable:true})
  avatarPublicId: string;
}

@ObjectType({isAbstract:true})
export class CoverImage {
  @Field(() => String,{nullable:true})
  coverUrl: string;

  @Field(() => String,{nullable:true})
  coverPublicId: string;
}

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

  @Field(() => AvatarImage,{nullable:true} )
  avatar:AvatarImage 

  @Field(() => String)
  email:string

  @Field(()=>CoverImage,{nullable:true})
  coverPicture:CoverImage

  @Field(()=>Number,{nullable:true})
  followingCount:number

  @Field(()=>Number,{nullable:true})
  followersCount:number

  @Field(() =>Boolean)
  isFollowing:boolean
  
  @Field(() =>Boolean)
  isOwnProfile:boolean

}
