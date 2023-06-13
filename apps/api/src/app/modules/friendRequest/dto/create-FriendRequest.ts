import { InputType, PickType } from "@nestjs/graphql";
import { FriendRequest } from "../entities/friendRequest";




@InputType()
export class CreateFriendRequestInput extends PickType(
  FriendRequest,
  ['target', 'user'],
  InputType
) {}