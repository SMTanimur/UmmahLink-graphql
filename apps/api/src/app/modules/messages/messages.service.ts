/*
https://docs.nestjs.com/providers#services
*/

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message';
import { Model, Types } from 'mongoose';
import { Chat, ChatDocument } from './entities/chat';
import { UsersService } from '../users/users.service';
import { CreateMessageInput } from './dto/createMessage.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    private readonly userService: UsersService
  ) {}

  async createMessage(createMessageInput: CreateMessageInput) {
    try {
      const {
        text,
        user: currentUser,
        user_id,
      } = createMessageInput;

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
        message:'Message sending successfully'
      }
    } catch (error) {
      console.log(error);
    }
  }
}
