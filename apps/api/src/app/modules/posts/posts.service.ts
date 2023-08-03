import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './entities/post';
import  { AggregateOptions, AggregatePaginateModel, FilterQuery, Model } from 'mongoose';
import { CreatePostInput } from './dto/craete-post-input';
import { UsersService } from '../users/users.service';
import { UpdatePostInput } from './dto/update-post-input';
import { DeletePostInput } from './dto/delete-post-input';
import { MessageResponse, PaginateOptionArgs } from '@social-zone/common';
import { Like, LikeDocument } from './entities/like';
import { CreatePostOrCommentLikeInput } from './dto/create-post-or-comment-like';
import {
  Notification,
  NotificationDocument,
  NotificationType,
} from '../notification/entities/notification';
import { Follow, FollowDocument } from '../follows/entities/follow';
import { NewsFeed, NewsFeedDocument } from '../newsFeed/entities/newsFeed';
import { NewsFeedQueryArgs } from '../newsFeed/dto/newsFeed-query-arg';
import { GetLikeResponse, LikesQueryArgs } from './dto/getLike-dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: AggregatePaginateModel<PostDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
    @InjectModel(NewsFeed.name) private newsModel: Model<NewsFeedDocument>,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private readonly userService: UsersService,
    private readonly uploadService: UploadService
  ) {}

  async createPost(createPostInput: CreatePostInput) {
    const user = await this.userService.findUserById(
      String(createPostInput._author_id)
    );
    if (!user) throw new UnauthorizedException('User not found');

  const post=  await this.postModel.create(createPostInput);
  await post.save()
  await post
  .populate({
      path: 'author',
      select: 'avatar username name'
  })

    const myFollowersDoc = await this.followModel.find({ target: createPostInput._author_id }); // target is yourself
    const myFollowers = myFollowersDoc.map(user => user.user); // so user property must be used 

    const newsFeeds = myFollowers
    .map(follower => ({ // add post to follower's newsfeed
        follower: follower,
        post: post._id,
        post_owner: createPostInput._author_id,
        createdAt: post.createdAt
    }))
    .concat({ // append own post on newsfeed
        follower: createPostInput._author_id,
        post_owner: createPostInput._author_id,
        post: post._id,
        createdAt: post.createdAt
    });

if (newsFeeds.length !== 0) {
    await this.newsModel.insertMany(newsFeeds);
}
    return { message: 'Post created successfully' };
  }


  async getPostById(postId: string): Promise<Post> {

    const post = await this.postModel.findById(postId);
    if(!post) throw new NotFoundException('Post not found')
    return post.populate('author')
  }

  async updatePost(updatePostInput: UpdatePostInput) {
    try {
      const { postId, user } = updatePostInput;
      const postExited = await this.postModel.findOne({ _id: postId });
      if (!postExited) throw new NotFoundException('Post not Found');
      if (String(postExited._author_id) == String(user)) {
        await this.postModel.findOneAndUpdate(
          { _id: postId },
          updatePostInput,
          { new: true }
        );
      }
      return {
        message: 'post updated successfully',
      };
    } catch (error) {
      throw new BadRequestException('server error');
    }
  }

  async deletePost(deletePostInput: DeletePostInput): Promise<MessageResponse> {
    try {
      const { postId, user } = deletePostInput;

      const post = await this.postModel.findOne({ _id: postId });
      if (!post) throw new NotFoundException('Post not found');

      if (String(post._author_id) == String(user)) {
        await this.likeModel.findOneAndDelete({
          target: post._id,
          user: post._author_id,
          type: 'Post',
        });
        await this.notificationModel.findOneAndDelete({
          initiator: post._author_id,
          target: post._id,
          type: NotificationType.like,
        });
        
        await this.postModel.findByIdAndDelete(post._id);
        const images = post.photos.map((img)=>img.photosPublicId)
        if(images.length){
        await this.uploadService.deleteMany(images)
        }
      
      }
      return { message: 'Post deleted' };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async likePost(
    createLikeInput: CreatePostOrCommentLikeInput
  ): Promise<MessageResponse> {
    try {
      const { postId, user: userId, type } = createLikeInput;

      const post = await this.postModel.findById(postId);
      if (!post) throw new NotFoundException('Post not found');

      const query = {
        target: postId,
        user: userId,
        type,
      };
      const like = await this.likeModel.findOne(query);
      if (!like) {
        const like = await this.likeModel.create(query);
        post.likes.push(like._id);
        post.save();
        if (String(post._author_id) !== String(userId)) {
          const newNotif = {
            type: NotificationType.like,
            initiator: userId,
            target: post._author_id,
            link: `/post/${post._id}`,
          };
          const exitedNotif = await this.notificationModel.findOne(newNotif);
          if (!exitedNotif) {
            await this.notificationModel.create(newNotif);
          } else {
            await this.notificationModel.findOneAndUpdate(newNotif, {
              $set: {
                created_at: Date.now(),
              },
            });
          }
        }
        return { message: 'Post liked successfully' };
      } else {
        await this.likeModel.findOneAndDelete(query);
        await this.postModel.findOneAndUpdate(
          { _id: postId },
          {
            $pull: { likes: like._id },
          }
        );
        return { message: 'Post unLiked successfully' };
      }
    } catch (error) {
      throw new BadRequestException('server error');
    }
  }



  async getPosts(
    username:string,
    query?: FilterQuery<NewsFeedQueryArgs>,
    options?: AggregateOptions
  ) {

    try {
      const { limit, page, orderBy, sortedBy } = options;

      const userExit = await this.userService.getUserInfo(username)
      if(!userExit) throw new NotFoundException('User not found')
      const { user} = query;

     
      if(user.username === userExit.username){
        const agg = this.postModel.aggregate([ {
          $match: {
            _author_id: userExit._id,
          },
        },
        {
          $sort: { [orderBy]: sortedBy === 'desc' ? -1 : 1 },
        },
        { // lookup from Comments collection to get total
          $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'postId',
              as: 'comments'
          }
      },
      { // lookup from Likes collection to get total
          $lookup: {
              from: 'likes',
              localField: '_id',
              foreignField: 'target',
              as: 'likes'
          }
      },
      {
          $lookup: {
              from: 'users',
              let: { authorID: '$_author_id' },
              pipeline: [
                  {
                      $match: {
                          $expr: {
                              $eq: ['$_id', '$$authorID']
                          }
                      }
                  },
                  {
                      $project: {
                          _id: 0,
                          id: '$_id',
                          email: 1,
                          name:1,
                          avatar: 1,
                          username: 1,
                      }
                  }
              ],
              as: 'author'
          }
      },
      {
          $addFields: {
              likeIDs: {
                  $map: {
                      input: "$likes",
                      as: "postLike",
                      in: '$$postLike.user'
                  }
              },
          }
      },
      { // add isLiked field by checking if user id exists in $likes array from lookup
          $addFields: {
              isLiked: { $in: [user._id, '$likeIDs'] },
              isOwnPost: { $eq: ['$$CURRENT._author_id', user._id ]}
          }
      },
      {
          $project: {
              _id: 0,
              id: '$_id',
              photos: 1,
              content: 1,
              createdAt: 1,
              updatedAt: 1,
              author: { $first: '$author' },
              isLiked: 1,
              isOwnPost: 1,
              commentsCount: {
                  $size: '$comments'
              },
              likesCount: {
                  $size: '$likes'
              }
          }
      }])

      
      const res = await this.postModel.aggregatePaginate(agg,{
        ...(limit ? { limit } : {}),
        ...(page ? { page } : {}),
      });
      return res
      }else{
        throw new ConflictException('please login to view this page')
      }
      
     
    } catch (error) {
      throw new BadRequestException('server error');
    }
  }

  async getPostLikes (query:LikesQueryArgs,options:PaginateOptionArgs):Promise<GetLikeResponse[]>{
    try {
      const {postId,user} = query
      const {limit,offset}=options
      const offse = offset|| 0;
      const skip = offse * limit;
      const post = await this.postModel.findById(postId)
      if(!post) throw new NotFoundException('Post not found')
        
      const likers = await this.likeModel.find({target:postId,type:'Post'})
                              .sort({createdAt:-1})
                              .skip(skip)
                              .limit(limit)
                              .populate({
                                path: 'user',
                                select: 'avatar username name _id'
                            })

                            if (likers.length === 0 && offse < 1) {
                               new  NotFoundException(404, 'No likes found.')
                          }
              
                          if (likers.length === 0 && offse > 0) {
                             new NotFoundException(404, 'No more likes found.')
                          }

                          const myFollowingDoc = await this.followModel.find({ user: user })
                   const myFollowing = myFollowingDoc.map(user => user.target.toString());
                   
                    const result = likers.map((like: any) => {
                      return {
                        ...like.user.toObject(),
                        isFollowing: myFollowing.includes(String(like.user._id)),
                      };
                    });

                return result

       
    } catch (error) {
      console.log(error)
  }
}
}
