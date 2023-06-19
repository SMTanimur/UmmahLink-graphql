import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';

import { Module } from '@nestjs/common';
import { Notification, NotificationSchema } from './entities/notification';
import { NotificationResolver } from './notification.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [],
  providers: [NotificationService,NotificationResolver],
})
export class NotificationModule {}
