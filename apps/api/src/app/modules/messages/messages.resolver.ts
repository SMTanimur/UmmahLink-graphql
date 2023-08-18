import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from './entities/message';
import { MessagesService } from './messages.service';
import {
  CurrentUser,
  MessageResponse,
  PaginateOptionArgs,
} from '@social-zone/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UseGuards } from '@nestjs/common';
import { CreateMessageInput } from './dto/createMessage.dto';
import { MessagePagination } from './dto/message-paginate';
import { MessageQueryArgs } from './dto/message-query-arg';
import { NotificationCount } from '../notification/dto/updateRespnse.dto';
import { MessageReadQueryArgs, ReadCountResponse } from './dto/updateMessageRead';

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

  @Mutation(() => ReadCountResponse)
  @UseGuards(AuthenticatedGuard)
  async updateMessageRead(
    @CurrentUser() user: any,
    @Args('updateMessageRead')
    updateMessageRead: MessageReadQueryArgs
  ) {
    updateMessageRead.user = user;
    return await this.messagesService.updateMessageRead(updateMessageRead)
  }

  @UseGuards(AuthenticatedGuard)
  @Query(() => MessagePagination, { name: 'getMessages', nullable: true })
  async getMessages(
    @Args('query') query: MessageQueryArgs,
    @Args('option') option: PaginateOptionArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.messagesService.getMessages(query, option);
  }
  @UseGuards(AuthenticatedGuard)
  @Query(() => MessagePagination, { name: 'getTargetMessage', nullable: true })
  async getTargetMessages(
    @Args('query') query: MessageReadQueryArgs,
    @Args('option') option: PaginateOptionArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.messagesService.getTargetMessage(query, option);
  }

  @UseGuards(AuthenticatedGuard)
  @Query(() => NotificationCount, { name: 'getUnreadMessageCount' })
  async getUnreadMessageCount(
    @Args('query') query: MessageQueryArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.messagesService.getUnreadMessageCount(query);
  }
}
