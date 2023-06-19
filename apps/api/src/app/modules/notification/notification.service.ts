/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './entities/notification';
import { FilterQuery,  PaginateModel, PaginateOptions } from 'mongoose';
import { NotificationPagination } from './dto/notification-paginate';
import { NotificationQueryArgs } from './dto/notification-query-arg';
import { NotificationUpdateArgs } from './dto/notification-update';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: PaginateModel<NotificationDocument>
  ) {}

  async paginate(
    query?: FilterQuery<NotificationQueryArgs>,
    options?: PaginateOptions
  ) {
    return new Object(
      await this.notificationModel.paginate(
        { target: query.user, ...query },
        options
      )
    ) as Promise<NotificationPagination>;
  }

  async updateNotification(updateNotificationInput: NotificationUpdateArgs) {
    const { notifiId, unread } = updateNotificationInput;
     await this.notificationModel.findByIdAndUpdate(notifiId, {
      $set: { unread },
    });

    return false
  }
}
