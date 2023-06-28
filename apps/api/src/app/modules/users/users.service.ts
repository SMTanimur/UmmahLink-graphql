/* eslint-disable prefer-const */
/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user-input';

import { Model, PaginateModel } from 'mongoose';
import {
  User,
  UserDocument,
  UserWithoutPassword,
} from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from '../../utils/hash';
import { UpdateUserInput } from './dto/update-user-input';
import { CreateOrUpdateProfileInput } from '../Info/dto/create-profile.input';
import { InfoService } from '../Info/Info.service';
import { Info, InfoDocument } from '../Info/entities/info';
import { Follow, FollowDocument } from '../follows/entities/follow';
import { ProfileInformation } from './dto/ProfileData';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: PaginateModel<UserDocument>,
    @InjectModel(Info.name) private infoModel: Model<InfoDocument>,
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
    private readonly infoService: InfoService
  ) {}

  async createUser(createUser: CreateUserInput): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        email: createUser.email,
        username: createUser.username,
      });
      if (user) {
        throw new ConflictException('User already exists');
      }
      createUser.password = await createHash(createUser.password);
      const userData = await (await this.userModel.create(createUser)).toJSON();
      return `Welcome ${userData.username}!`;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo(username: string) {
    const user = await this.userModel
      .findOne({ username })
      .select('-password');
   
  
    if (!user) throw new ConflictException('User not found');
      return user
  }

  async updateUser(id: string, updateUserDto: UpdateUserInput) {
    const exitedUser = await this.userModel.findOne({ _id: id });
    if (!exitedUser) {
      throw new ConflictException('User not found');
    }
    const updateData = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      { new: true }
    );
    return updateData;
  }

  async createOrUpdateProfile(
    userId: string,
    createOrUpdateProfileInput: CreateOrUpdateProfileInput
  ) {
    const user = await this.infoModel.findOne({ user: userId });

    if (user) {
      await this.infoService.update(user._id, createOrUpdateProfileInput);
      return 'Profile Create';
    }
    const profile = await this.infoService.create(createOrUpdateProfileInput);
    await this.updateUser(userId, { info: profile._id });
    return {
      message: 'Profile updated successfully',
    }
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).select('-password');
    if (!user) return null;

    return user;
  }

  async findUserByUsername(username: string,userDocs:UserDocument): Promise<ProfileInformation> {
    try {
      const user = await this.userModel.findOne({ username });
      if(!user) throw new ConflictException('User not found');


      const myFollowingDoc = await this.followModel.find({ user:userDocs._id });
      const myFollowing = myFollowingDoc.map(user => user.target);

      const [agg] = await this.userModel.aggregate([
        {
            $match: { _id: user._id }
        },
        {
            $lookup: { // lookup for followers
                from: 'follows',
                localField: '_id',
                foreignField: 'target',
                as: 'followers'
            }
        },
        {
            $lookup: { // lookup for following
                from: 'follows',
                localField: '_id',
                foreignField: 'user',
                as: 'following'
            }
        },
        {
            $addFields: {
                isFollowing: { $in: ['$_id', myFollowing] },
                isOwnProfile: {
                    $eq: ['$$CURRENT.username', userDocs.username]
                }
            }
        },
        {
            $project: {
                _id: 0,
                id: '$_id',
                info: 1,
                email: 1,
                avatar: 1,
                coverPicture: 1,
                username: 1,
                name: 1,
                dateJoined: 1,
                followingCount: { $size: '$following' },
                followersCount: { $size: '$followers' },
                isFollowing: 1,
                isOwnProfile: 1
            }
        },
    ]);

    return agg;


    } catch (error) {
      console.log(error);
    }

   
  }
  async findOne(query: object): Promise<UserDocument> {
    const user = await this.userModel.findOne(query);

    if (!user) return null;

    return user;
  }
}
