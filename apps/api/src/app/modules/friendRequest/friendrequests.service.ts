/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestDocument } from './entities/friendRequest';
import { Model } from 'mongoose';

import { CreateFriendRequestInput } from './dto/create-FriendRequest';
import { User, UserDocument } from '../users/entities/user.entity';
import { CloseRequestInput } from './dto/close-request';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectModel(FriendRequest.name)
    private friendModel: Model<FriendRequestDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async createFriendRequest(createFriendRequest: CreateFriendRequestInput) {
    const { target } = createFriendRequest;
    const user = await this.userModel.findOne({
      _id: createFriendRequest.user,
    });
    if (!user) throw new ConflictException('User not found');

    const exited = await this.friendModel.findOne({target,user:user._id})
    if(exited) throw new ConflictException('Friend request already sent')
    const newFriendRequest = await this.friendModel.create(createFriendRequest);

    await this.userModel.findByIdAndUpdate(user, {
      $push: {
        friendRequests: newFriendRequest._id,
      },
    });

    await this.userModel.findByIdAndUpdate(target, {
      $push: {
        friendRequests: newFriendRequest._id,
      },
    });

    const friendRequest = await this.friendModel
      .findOne({ _id: newFriendRequest._id })
      .populate('user','username avatar')
      .populate('target','username avatar')

    return friendRequest
  }

  async closeRequest(closeRequestInput: CloseRequestInput) {
    const { status, target } = closeRequestInput;
    const friendRequest = await this.friendModel.findOne({
      _id: String(target),
    });

    if (status.toLowerCase() === 'accept') {
      await this.userModel.findByIdAndUpdate(
        friendRequest.target,
        {
          $push: {
            friends: friendRequest.user,
          },
          $pull: {
            friendRequests: friendRequest._id,
          },
        },
        { new: true }
      );

      await this.userModel.findByIdAndUpdate(
        friendRequest.user,
        {
          $push: {
            friends: friendRequest.target,
          },
          $pull: {
            friendRequests: friendRequest._id,
          },
        },
        { new: true }
      );

      const newFriend = await this.userModel
        .findOne({ _id: friendRequest.user })
        .select('username avatar');
      await this.friendModel.findByIdAndRemove(friendRequest._id);
      return newFriend.toJSON();
    } else {
      const userData = await this.userModel.findByIdAndUpdate(
        friendRequest.target,
        {
          $pull: {
            friendRequests: friendRequest._id,
          },
        }
      );
      await this.userModel.findByIdAndUpdate(friendRequest.user, {
        $pull: {
          friendRequests: friendRequest._id,
        },
      });
      await this.friendModel.findByIdAndRemove(friendRequest._id);
      return userData.toJSON();
    }
  }
}
