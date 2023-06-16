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


export enum LikeType {
  POST = 'Post',
  COMMENT = 'Comment',
}

registerEnumType(LikeType, { name: 'LikeType' });

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
@InputType('LikeInputType', { isAbstract: true })
export class Like extends CoreEntity {
  @Prop({ type: String, enum: LikeType })
  @Field(() => LikeType)
  type: LikeType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field((_type) => ID, { nullable: true })
  target: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field((_type) => ID, { nullable: true })
  user: string;
}

export type LikeDocument = Like & Document;
export const LikeSchema = SchemaFactory.createForClass(Like);
