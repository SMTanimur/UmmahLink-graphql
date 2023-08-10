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
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { NotificationUpdateArgs } from './dto/notification-update';
import {
  NotificationCount,
  NotificationResponse,
} from './dto/updateRespnse.dto';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthenticatedGuard)
  @Query(() => NotificationPagination, { name: 'getNotifications' })
  async getNotifications(
    @Args('query') query: NotificationQueryArgs,
    @Args('options') options: PaginateOptionArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.notificationService.paginate(query, options);
  }
  @UseGuards(AuthenticatedGuard)
  @Query(() => NotificationCount, { name: 'getNotificationCount' })
  async getNotificationCount(
    @Args('query') query: NotificationCountQueryArgs,
    @CurrentUser() user: any
  ) {
    query.user = user;
    return await this.notificationService.getNotificationCount(query);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => NotificationResponse)
  async updateNotification(
    @Args('updateNotificationArgs')
    updateNotificationInput: NotificationUpdateArgs
  ) {
    return await this.notificationService.updateNotification(
      updateNotificationInput
    );
  }
  @UseGuards(AuthenticatedGuard)
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
