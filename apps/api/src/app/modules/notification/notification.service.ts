/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './entities/notification';
import { FilterQuery, PaginateModel, PaginateOptions } from 'mongoose';
import { NotificationPagination } from './dto/notification-paginate';
import {
  NotificationCountQueryArgs,
  NotificationQueryArgs,
} from './dto/notification-query-arg';
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
          sort:{ 'createdAt': -1 },
          populate: [
            { path: 'initiator', select: 'name username avatar' },
            { path: 'target', select: 'username avatar name' },
          ],
        }
      )
    ) as Promise<NotificationPagination>;
  }

  async updateNotification(updateNotificationInput: NotificationUpdateArgs) {
    const { notifiId } = updateNotificationInput;
    await this.notificationModel.findByIdAndUpdate(notifiId, {
      $set: { unread: false },
    });

    return {
      state: false,
    };
  }
  async notificationMark(query: FilterQuery<NotificationCountQueryArgs>) {
    const { user } = query;
    await this.notificationModel.updateMany(
      { target: user?._id },
      {
        $set: { unread: false },
      }
    );
    return {
      state: false,
    };
  }

  async getNotificationCount(query: FilterQuery<NotificationCountQueryArgs>) {
    const { user } = query;
    const count = await this.notificationModel.find({ target: user?._id });
    return {
      count: count.length,
    };
  }
}
