/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './entities/notification';
import { FilterQuery, PaginateModel, PaginateOptions } from 'mongoose';
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
    const { unread, type, user } = query;
    const { page, limit } = options;
    return new Object(
      await this.notificationModel.paginate(
        {
          target: user._id,
          ...(type ? { type } : {}),
          ...(unread ? { unread } : {}),
        },
        {
          page,
          limit,
          populate: [
            { path: 'initiator', select: 'name username avatar' },
            { path: 'target', select: 'username avatar name' },
          ],
        }
      )
    ) as Promise<NotificationPagination>;
  }

  async updateNotification(updateNotificationInput: NotificationUpdateArgs) {
    const { notifiId, unread } = updateNotificationInput;
    await this.notificationModel.findByIdAndUpdate(notifiId, {
      $set: { unread },
    });

    return false;
  }
}
