import { Args, Query, Resolver } from '@nestjs/graphql';
import { Notification } from './entities/notification';
import { NotificationService } from './notification.service';
import { NotificationPagination } from './dto/notification-paginate';
import { CurrentUser, PaginateOptionArgs } from '@social-zone/common';
import { NotificationQueryArgs } from './dto/notification-query-arg';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthenticatedGuard)
  @Query(() => NotificationPagination,{name:'notifications'})
  async  getNotifications(
    @Args('query') query: NotificationQueryArgs,
    @Args() options: PaginateOptionArgs,
    @CurrentUser() user: any,
  ) {
    query.user = user._id;
    return await this.notificationService.paginate(query, options);
  }
}
