/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowDocument } from './entities/follow';
import {
  AggregateOptions,
  AggregatePaginateModel,
  FilterQuery,
  Model,
} from 'mongoose';
import { FollowOrUnFollowInput } from './input/followerUnfollowInput';
import { User, UserDocument } from '../users/entities/user.entity';
import {
  Notification,
  NotificationDocument,
} from '../notification/entities/notification';
import { Post, PostDocument } from '../posts/entities/post';
import { NewsFeed, NewsFeedDocument } from '../newsFeed/entities/newsFeed';
import { FollowQueryArgs } from './dto/follow-query-arg';
import { FollowPagination } from './dto/follow-paginate';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(Follow.name)
    private followModel: AggregatePaginateModel<FollowDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(NewsFeed.name) private newsFeedModel: Model<NewsFeedDocument>,
    @InjectModel(User.name) private userModel: AggregatePaginateModel<UserDocument>,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>
  ) {}

  async followUser(followOrUnFollowInput: FollowOrUnFollowInput) {
    try {
      const { userId, follow_ID } = followOrUnFollowInput;
      // CHECK IF FOLLOWING USER EXIST
      const user = await this.userModel.findById(follow_ID);
      const currentUser = await this.userModel.findOne({ _id: userId });

      //Todo: check if user is already following
      if (!user)
        throw new NotFoundException(
          "The person you're trying to follow doesn't exist."
        );

      //TODO : CHECK IF FOLLOWING IS NOT YOURSELF

      if (String(userId) === String(follow_ID))
        throw new NotFoundException('You cannot follow yourself.');

      //TODO: CHECK IF USER IS ALREADY FOLLOWING

      const isFollowing = await this.followModel.findOne({
        user: userId,
        target: follow_ID,
      });
      if (isFollowing) {
        throw new ConflictException("You're already following this person.");
      } else {
        const follow = new this.followModel({
          user: userId,
          target: follow_ID,
        });
        await follow.save();
      }

      //TODO: __ filter

      const notification = await this.notificationModel.create({
        type: 'follow',
        initiator: userId,
        target: follow_ID,
        link: `/user/${currentUser.username}`,
        createdAt: Date.now(),
      });

      await notification.save();

      // TODO: SUBSCRIBE TO USER'S FEED
      const subscribeToUserFeed = await this.postModel
        .find({ author: follow_ID })
        .sort({ createdAt: -1 })
        .limit(10);

      if (subscribeToUserFeed.length !== 0) {
        const feeds = subscribeToUserFeed.map((post) => {
          return {
            follower: currentUser._id,
            post: post._id,
            post_owner: post._author_id,
            createdAt: post.createdAt,
          };
        });

        await this.newsFeedModel.insertMany(feeds);
      }

      return { message: `You're now following ${user.username}` };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async unfollowUser(followOrUnFollowInput: FollowOrUnFollowInput) {
    try {
      const { userId, follow_ID } = followOrUnFollowInput;
      // TODO: CHECK IF FOLLOWING USER EXIST
      const user = await this.userModel.findById(follow_ID);
      if (!user)
        throw new NotFoundException(
          "The person you're trying to unfollow doesn't exist."
        );

      if (String(userId) === String(follow_ID))
        throw new NotFoundException('You cannot unFollow yourself.');

      await this.followModel.deleteOne({ user: userId, target: follow_ID });
      await this.newsFeedModel.deleteMany({
        follower: userId,
        post_owner: follow_ID,
      });

      return { message: `You're now unFollowing ${user.username}` };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async getFollowers(
    username:string,
    query?: FilterQuery<FollowQueryArgs>,
    options?: AggregateOptions
  ) {
    try {
      const { user, type } = query;
      const {limit,page}=options
      const userInfo = await this.userModel.findOne({username})
      if(!userInfo) throw new NotFoundException('User not found')


      const myFollowingDoc = await this.followModel.find({ user: user._id });
      const myFollowing =  myFollowingDoc.map((user) => user.target); // map to array of user IDs
      const matchCondition = type === 'followers' ? { target: user._id } : { user: user._id }
      const aggregate =   this.followModel.aggregate([
        {
          $match: matchCondition
          
        },
        {
          $lookup: {
              from: 'users',
              localField: type === 'following' ? 'target' : 'user',
              foreignField: '_id',
              as: 'user'
          }
      },
      {
          $unwind: '$user'
      },
      {
          $addFields: {
              isFollowing: { $in: ['$user._id', myFollowing] }
          }
      },
        {
          $project: {
            _id: 0,
            id: '$user._id',
            username: '$user.username',
            name: '$user.name',
            email: '$user.email',
            avatar: '$user.avatar',
            birthday:'$user.birthday',
            contact:'$user.contact',
            bio:'$user.bio',
            gender:'$user.gender',
            isFollowing: 1,
          },
        },
      ]);
      

      return await  this.followModel.aggregatePaginate(aggregate,{
        ...(limit ? { limit } : {}),
        ...(page ? { page } : {}),
      })as FollowPagination
    } catch (error) {
      console.log(error);
    }
  }

  async getPeopleSuggestions(
    query?: FilterQuery<FollowQueryArgs>,
    options?: AggregateOptions
  ) {

    try {
      const { user } = query;
      const {limit,page}= options
      const myFollowingDoc = await this.followModel.find({ user: user._id });
      const myFollowing =  myFollowingDoc.map((user) => user.target); // map to array of user IDs

      const agg = this.userModel.aggregate([
        {
            $match: {
                _id: {
                    $nin: [...myFollowing, user._id]
                }
            }
        },

      
        {
            $addFields: {
                isFollowing: false,
            }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            username: '$username',
            name: '$name',
            email: '$email',
            avatar: '$avatar',
            isFollowing: 1,
          },
        }
    ])
      
   
     return await  this.userModel.aggregatePaginate(agg,{
      ...(limit < 10 ? ([{ $sample: { size: limit } }]) : []),
      ...(page ? { page } : {}),
    })as FollowPagination
   
    } catch (error) {
      console.log(error)
    }
  }
}
