/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message';
import { AggregateOptions, FilterQuery, Model, Types } from 'mongoose';
import { Chat, ChatDocument } from './entities/chat';
import { UsersService } from '../users/users.service';
import { CreateMessageInput } from './dto/createMessage.dto';
import { MessageQueryArgs } from './dto/message-query-arg';
import { AggregatePaginateModel } from 'mongoose';
import { MessagePagination } from './dto/message-paginate';
import { MessageReadQueryArgs } from './dto/updateMessageRead';
import { PaginateModel } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: PaginateModel<MessageDocument>,
    @InjectModel(Chat.name)
    private chatModel: AggregatePaginateModel<ChatDocument>,
    private readonly userService: UsersService
  ) {}

  async createMessage(createMessageInput: CreateMessageInput) {
    try {
      const { text, user: currentUser, user_id } = createMessageInput;

      const user = await this.userService.findUserById(user_id);

      if (!user) throw new NotFoundException('Receiver not Found');

      if (currentUser._id.toString() === user_id) {
        throw new ConflictException('You can\t send message to yourself.');
      }

      const message = await this.messageModel.create({
        from: currentUser._id,
        to: user_id,
        text,
        seen: false,
        createdAt: Date.now(),
      });

      await this.chatModel.findOneAndUpdate(
        {
          participants: {
            $all: [
              { $elemMatch: { $eq: currentUser._id } },
              { $elemMatch: { $eq: new Types.ObjectId(user_id) } },
            ],
          },
        },
        {
          $set: {
            lastmessage: message._id,
            participants: [currentUser._id, new Types.ObjectId(user_id)],
          },
        },
        { upsert: true }
      );

      return {
        message: 'Message sending successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMessages(
    query?: FilterQuery<MessageQueryArgs>,
    option?: AggregateOptions
  ) {
    try {
      const { user } = query;
      const { limit, page } = option;

      const agg = this.chatModel.aggregate([
        {
          $match: {
            participants: { $in: [user?._id] },
          },
        },

        {
          $lookup: {
            from: 'messages',
            localField: 'lastmessage',
            foreignField: '_id',
            as: 'message',
          },
        },
        {
          $unwind: '$message',
        },
        {
          $project: {
            _id: 0,
            message: 1,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'message.from',
            foreignField: '_id',
            as: 'message.from',
          },
        },
        { $unwind: '$message.from' },
        {
          $project: {
            to: '$message.to',
            text: '$message.text',
            id: '$message._id',
            seen: '$message.seen',
            createdAt: '$message.createdAt',
            from: {
              username: '$message.from.username',
              id: '$message.from._id',
              avatar: '$message.from.avatar',
              name: '$message.from.name',
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'to',
            foreignField: '_id',
            as: 'message.to',
          },
        },
        { $unwind: '$message.to' },
        {
          $project: {
            id: 1,
            from: 1,
            text: 1,
            seen: 1,
            createdAt: 1,
            to: {
              username: '$message.to.username',
              id: '$message.to._id',
              avatar: '$message.to.avatar',
              name: '$message.to.name',
            },
            isOwnMessage: {
              $cond: [{ $eq: ['$from.id', user._id] }, true, false],
            },
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
      const res = (await this.chatModel.aggregatePaginate(agg, {
        ...(limit ? { limit } : {}),
        ...(page ? { page } : {}),
      })) as MessagePagination;

      if (res.docs.length === 0)
        throw new NotFoundException('No Message found');
      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getUnreadMessageCount(query: FilterQuery<MessageQueryArgs>) {
    const { user } = query;
    const agg = await this.messageModel.aggregate([
      {
        $match: {
          to: user._id,
        },
      },
      {
        $group: {
          _id: '$from',
          seenCount: {
            $push: {
              $cond: [{ $eq: ['$seen', false] }, '$_id', '$$REMOVE'],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: {
            $size: '$seenCount',
          },
        },
      },
    ]);
    console.log(agg);

    const totalUnseen = agg.reduce((acc, obj) => acc + obj.count, 0);
    return {
      count: totalUnseen,
    };
  }

  async updateMessageRead(
    updateMessageRead: FilterQuery<MessageReadQueryArgs>
  ) {
    try {
      const { user, from_id } = updateMessageRead;
      const userExit = await this.userService.findUserById(user?._id);
      if (!userExit) throw new NotFoundException('User not found');
      await this.messageModel.updateMany(
        {
          from: new Types.ObjectId(from_id),
          to: user._id,
          seen: false,
        },
        {
          $set: {
            seen: true,
          },
        }
      );

      return {
        state: true,
      };
    } catch (error) {
      console.log('can not read message');
      throw new BadRequestException(error);
    }
  }

  async getTargetMessage(
    query?: FilterQuery<MessageReadQueryArgs>,
    option?: AggregateOptions
  ) {
    try {
      const { user, from_id } = query;
      const { limit, page } = option;

      const res = await this.messageModel.paginate(
        {
          $or: [
            { from: user._id, to: new Types.ObjectId(from_id) },
            { from: new Types.ObjectId(from_id), to: user._id },
          ],
        },
        {
          page,
          limit,
          sort: { createdAt: -1 },
          populate: [{ path: 'from', select: 'name username avatar' }],
        }
      );

      return {
        hasNextPage: res.hasNextPage,
        hasPrevPage: res.hasPrevPage,
        limit: res.limit,
        offset: res.offset,
        page: res.page,
        prevPage: res.prevPage,
        totalDocs: res.totalDocs,
        totalPages: res.totalPages,
        meta: res.Meta,
        docs: res.docs.map((msg) => {
          return {
            ...msg.toObject(),
            isOwnMessage: msg.from._id.toString() == user._id.toString() ? true : false,
          };
        }),
      };
    } catch (error) {
      console.log('djfd');
    }
  }
}
