import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FriendRequest } from './entities/friendRequest';
import { FriendRequestsService } from './friendrequests.service';
import { UseGuards } from '@nestjs/common';
import { CreateFriendRequestInput } from './dto/create-FriendRequest';
import { CurrentUser } from '@social-zone/common';
import { CloseRequestInput } from './dto/close-request';
import { UserWithoutPassword } from '../users/entities/user.entity';
import { FriendRequestResponse } from './dto/FriendRequestResponse';
import { GqlAuthGuard } from '../auth/guards/auth.guard';

@Resolver(() => FriendRequest)
export class FriendRequestResolver {
  constructor(private readonly friendRequestService: FriendRequestsService) {}

  @Mutation(() => FriendRequestResponse)
  @UseGuards(GqlAuthGuard )
  async createFriendRequest(
    @CurrentUser() user: any,
    @Args('createFriendRequestInput')
    createFriendRequestInput: CreateFriendRequestInput
  ) {
    createFriendRequestInput.user = user._id;
    return await this.friendRequestService.createFriendRequest(
      createFriendRequestInput
    );
  }
  @Mutation(() => UserWithoutPassword)
  @UseGuards(GqlAuthGuard )
  async closeFriendRequest(
    @Args('closeRequestInput')
    closeRequestInput: CloseRequestInput
  ) {
    console.log(closeRequestInput);
    return await this.friendRequestService.closeRequest(closeRequestInput);
  }
}
