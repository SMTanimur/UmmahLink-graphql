import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import { Notification } from '../entities/notification';


@ObjectType()
export class NotificationPagination extends Paginated(Notification) {}