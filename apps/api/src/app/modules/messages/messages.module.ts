import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { Message, MessageSchema } from './entities/message';
import { Chat, ChatSchema } from './entities/chat';
import { UsersModule } from '../users/users.module';
import { MessageResolver } from './messages.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema },
      
    ]),
    forwardRef(() => UsersModule),
   
  ],
  controllers: [],
  providers: [MessagesService,MessageResolver],
})
export class MessagesModule {}
