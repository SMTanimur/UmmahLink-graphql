
import { Field, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';
import {  NotificationType } from '../entities/notification';
import { AvatarImage } from '../../users/dto/ProfileData';

@ObjectType()
export class NotificationUser {

  @Field(() => String)
  username: string;

  @Field(() => AvatarImage)
  avatar: AvatarImage 

  @Field(() => String)
  name: string;
}
@ObjectType()
export class NotificationPaginate {

  @Field(() => NotificationType)
  type: NotificationType;
  
  @Field(() => String)
  id: string;

  @Field((_type) =>NotificationUser )
  target: NotificationUser

  @Field((_type) => NotificationUser)
  initiator: NotificationUser

  @Field(() => Boolean)
  unread: boolean;

  @Field(() => String)
  link: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class NotificationPagination extends Paginated(NotificationPaginate) {}