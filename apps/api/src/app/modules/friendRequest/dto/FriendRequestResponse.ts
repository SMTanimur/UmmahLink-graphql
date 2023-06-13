import { Field, ObjectType, PickType } from "@nestjs/graphql";
import { FriendRequest } from "../entities/friendRequest";


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