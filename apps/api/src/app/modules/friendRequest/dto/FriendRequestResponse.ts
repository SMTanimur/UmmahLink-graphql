import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class UserResponse {
  @Field()
  username: string;

  @Field()
  avatar: string;
}



@ObjectType()
export class FriendRequestResponse {
  @Field(()=>UserResponse)
  target:UserResponse

  @Field(()=>UserResponse)
  user:UserResponse
}