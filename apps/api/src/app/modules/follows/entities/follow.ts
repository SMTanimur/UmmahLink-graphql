import { Field, ID, InputType, ObjectType} from '@nestjs/graphql';

import {
  IsArray
 
} from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { CoreEntity } from '@social-zone/common';




@ObjectType()
@Schema({ versionKey: false })
@InputType('FollowInputType', { isAbstract: true })
export class Follow extends CoreEntity {

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field(() => User)
  user: User;


  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field(() => ID)
  target:mongoose.Schema.Types.ObjectId
}

export type FollowDocument = Follow & Document
export const FollowSchema = SchemaFactory.createForClass(Follow);
