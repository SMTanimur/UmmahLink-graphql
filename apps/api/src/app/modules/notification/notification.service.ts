/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './entities/notification';
import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { NotificationPagination } from './dto/notification-paginate';
import { NotificationQueryArgs } from './dto/notification-query-arg';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: PaginateModel<NotificationDocument>
  ) {}


  async paginate(query?: FilterQuery<NotificationQueryArgs>, options?: PaginateOptions) {

    return new Object(
    await  this.notificationModel.paginate({target:query.user}, options),
    ) as Promise<NotificationPagination>;
  }
  
}
