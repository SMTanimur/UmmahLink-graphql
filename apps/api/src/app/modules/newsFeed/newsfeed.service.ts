/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewsFeed, NewsFeedDocument } from './entities/newsFeed';
import { AggregatePaginateModel, FilterQuery, Model } from 'mongoose';
import { AggregateOptions } from 'mongoose';
import { NewsFeedQueryArgs } from './dto/newsFeed-query-arg';
import { NewsFeedPaginate, NewsFeedPagination } from './dto/newsFeed-paginate';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class NewsFeedService {
  constructor(
    @InjectModel(NewsFeed.name)
    private newsFeedModel: AggregatePaginateModel<NewsFeedDocument>
  ) {}

  // async getFeeds(
  //   query?: FilterQuery<NewsFeedQueryArgs>,
  //   options?: AggregateOptions
  // ) {
  //   try {
  //     const { user } = query;
  //     const {  orderBy,sortedBy} = options;
  //     const page = parseInt(options.page, 10) || 1;
  //     const limit = parseInt(options.limit, 10) || 12
  //     const startIndex = (page - 1) * limit;
  //     const endIndex = page * limit;

  //     const agg =await this.newsFeedModel.aggregate([
  //       {
  //         $match: {
  //           follower: user._id,
  //         },
  //       },
  //       {
  //         $sort: { [orderBy]: sortedBy === 'desc' ? -1 : 1 },

  //       },
  //       { $skip: startIndex },
  //       { $limit: limit },

  //       {
  //         $lookup: {
  //           from: 'posts',
  //           localField: 'post',
  //           foreignField: '_id',
  //           as: 'post',
  //         },
  //       },
  //       {
  //         $project: {
  //           post: { $first: '$post' },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 0,
  //           id: '$post._id',
  //           photos: '$post.photos',
  //           content: '$post.content',
  //           _author_id: '$post._author_id',
  //           createdAt: '$post.createdAt',
  //           updatedAt: '$post.updatedAt',
  //         },
  //       },
  //       { // lookup from Comments collection to get total
  //         $lookup: {
  //             from: 'comments',
  //             localField: 'id',
  //             foreignField: 'postId',
  //             as: 'comments'
  //         }
  //     },
  //     { // lookup from Likes collection to get total
  //         $lookup: {
  //             from: 'likes',
  //             localField: 'id',
  //             foreignField: 'target',
  //             as: 'likes'
  //         }
  //     },
  //     {
  //         $lookup: {
  //             from: 'users',
  //             let: { authorID: '$_author_id' },
  //             pipeline: [
  //                 {
  //                     $match: {
  //                         $expr: {
  //                             $eq: ['$_id', '$$authorID']
  //                         }
  //                     }
  //                 },
  //                 {
  //                     $project: {
  //                         _id: 0,
  //                         id: '$_id',
  //                         email: 1,
  //                         name:1,
  //                         avatar: 1,
  //                         username: 1,
  //                     }
  //                 }
  //             ],
  //             as: 'author'
  //         }
  //     },
  //     {
  //         $addFields: {
  //             likeIDs: {
  //                 $map: {
  //                     input: "$likes",
  //                     as: "postLike",
  //                     in: '$$postLike.user'
  //                 }
  //             },
  //         }
  //     },
  //     { // add isLiked field by checking if user id exists in $likes array from lookup
  //         $addFields: {
  //             isLiked: { $in: [user._id, '$likeIDs'] },
  //             isOwnPost: { $eq: ['$$CURRENT._author_id', user._id ]}
  //         }
  //     },
  //       {
  //         $project: {
  //           _id: 0,
  //           id: 1,
  //           photos: 1,
  //           content: 1,
  //           createdAt: 1,
  //           updatedAt: 1,
  //           author: { $first: '$author' },
  //           isLiked: 1,
  //           isOwnPost: 1,
  //           commentsCount: {
  //             $size: '$comments',
  //           },
  //           likesCount: {
  //             $size: '$likes',
  //           },
  //         },
  //       },
  //     ]);
  //     let next = null;
  //     console.log(endIndex,agg.length)
  //     if (endIndex < agg.length) {
  //       console.log(page,agg.length)
  //       next = page + 1;
  //       console.log(next)
  //     }

  //     return {
  //       docs:agg,
  //       next,
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async getFeeds(
    query?: FilterQuery<NewsFeedQueryArgs>,
    options?: AggregateOptions
  ) {
    try {
      const { user } = query;
      const { limit, page, orderBy, sortedBy } = options;
      const skip = (page - 1) * limit;

      const agg = this.newsFeedModel.aggregate([
        {
          $match: {
            follower: user._id,
          },
        },

        {
          $sort: { [orderBy]: sortedBy === 'desc' ? -1 : 1 },
        },
        { $skip: skip},
        
        {
          $lookup: {
            from: 'posts',
            localField: 'post',
            foreignField: '_id',
            as: 'post',
          },
        },
        {
          $project: {
            post: { $first: '$post' },
          },
        },
        {
          $project: {
            _id: 0,
            id: '$post._id',
            photos: '$post.photos',
            content: '$post.content',
            _author_id: '$post._author_id',
            createdAt: '$post.createdAt',
            updatedAt: '$post.updatedAt',
          },
        },
        {
          // lookup from Comments collection to get total
          $lookup: {
            from: 'comments',
            localField: 'id',
            foreignField: 'postId',
            as: 'comments',
          },
        },
        {
          // lookup from Likes collection to get total
          $lookup: {
            from: 'likes',
            localField: 'id',
            foreignField: 'target',
            as: 'likes',
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { authorID: '$_author_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$authorID'],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  id: '$_id',
                  email: 1,
                  name: 1,
                  avatar: 1,
                  username: 1,
                },
              },
            ],
            as: 'author',
          },
        },
        {
          $addFields: {
            likeIDs: {
              $map: {
                input: '$likes',
                as: 'postLike',
                in: '$$postLike.user',
              },
            },
          },
        },
        {
          // add isLiked field by checking if user id exists in $likes array from lookup
          $addFields: {
            isLiked: { $in: [user._id, '$likeIDs'] },
            isOwnPost: { $eq: ['$$CURRENT._author_id', user._id] },
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            photos: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            author: { $first: '$author' },
            isLiked: 1,
            isOwnPost: 1,
            commentsCount: {
              $size: '$comments',
            },
            likesCount: {
              $size: '$likes',
            },
          },
        },
      ]);
      const res = await this.newsFeedModel.aggregatePaginate(agg,{
        ...(limit ? { limit } : {}),
      });
     
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
