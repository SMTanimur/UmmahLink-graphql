import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Message } from './entities/message';
import { MessagesService } from './messages.service';
import { CurrentUser, MessageResponse } from '@social-zone/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UseGuards } from '@nestjs/common';
import { CreateMessageInput } from './dto/createMessage.dto';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => MessageResponse)
  @UseGuards(AuthenticatedGuard)
  async createMessage(
    @CurrentUser() user: any,
    @Args('createMessageInput')
    createMessageInput: CreateMessageInput
  ) {
    createMessageInput.user = user;
    return await this.messagesService.createMessage(createMessageInput);
  }
}
