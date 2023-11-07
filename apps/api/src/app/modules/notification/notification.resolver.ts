/* eslint-disable @typescript-eslint/no-explicit-any */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notification } from './entities/notification';
import { NotificationService } from './notification.service';
import { NotificationPagination } from './dto/notification-paginate';
import { CurrentUser, PaginateOptionArgs } from '@social-zone/common';
import {
  NotificationCountQueryArgs,
  NotificationQueryArgs,
} from './dto/notification-query-arg';
import { UseGuards } from '@nestjs/common';
import { NotificationUpdateArgs } from './dto/notification-update';
import {
  NotificationCount,
  NotificationResponse,
} from './dto/updateRespnse.dto';
import { GqlAuthGuard } from '../auth/guards/auth.guard';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(GqlAuthGuard )
  @Query(() => NotificationPagination, { name: 'getNotifications' })
  async getNotifications(
    @Args('query') query: NotificationQueryArgs,
    @Args('options') options: PaginateOptionArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.notificationService.paginate(query, options);
  }
  @UseGuards(GqlAuthGuard )
  @Query(() => NotificationCount, { name: 'getNotificationCount' })
  async getNotificationCount(
    @Args('query') query: NotificationCountQueryArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.notificationService.getNotificationCount(query);
  }

  @UseGuards(GqlAuthGuard )
  @Mutation(() => NotificationResponse)
  async updateNotification(
    @Args('updateNotificationArgs')
    updateNotificationInput: NotificationUpdateArgs
  ) {
    return await this.notificationService.updateNotification(
      updateNotificationInput
    );
  }
  @UseGuards(GqlAuthGuard )
  @Mutation(() => NotificationResponse)
  async markNotification(
    @Args('markNotificationArgs')
    markNotificationArgs: NotificationCountQueryArgs,
    @CurrentUser() user: any
  ) {
    markNotificationArgs.user = user;
    return await this.notificationService.notificationMark(
      markNotificationArgs
    );
  }
}
