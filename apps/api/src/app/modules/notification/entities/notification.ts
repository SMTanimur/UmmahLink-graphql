import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CoreEntity } from '@social-zone/common';

export enum NotificationType {
  like = 'like',
  follow = 'follow',
  commentLike = 'comment-like',
  comment = 'comment',
  reply = 'reply',
}

registerEnumType(NotificationType, { name: 'NotificationType' });

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
@InputType('NotificationInputType', { isAbstract: true })

export class Notification extends CoreEntity {
  @Prop({ type: String, enum: NotificationType })
  @Field(() => NotificationType)
  type: NotificationType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field((_type) => ID, { nullable: true })
  target: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field((_type) => ID, { nullable: true })
  initiator: string;

  @Prop({ type: Boolean, default: true })
  @Field(() => Boolean,{nullable:true})
  unread: boolean;

  @Prop({ type: String })
  @Field(() => String,{nullable:true})
  link: string;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
