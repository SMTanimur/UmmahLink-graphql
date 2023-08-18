import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { CoreEntity } from '@social-zone/common';
import { IsArray, IsBoolean, IsDate, IsMongoId, IsString, MinLength } from 'class-validator';
import { Message } from './message';

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
@InputType('chatInput', { isAbstract: true })
export class Chat extends CoreEntity {
  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }])
  @IsArray()
  @IsMongoId({each:true})
  @Field((_type) => [User], { nullable: true })
  participants: User[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  })
  @Field((_type) => Message, { nullable: true })
  lastmessage: Message

}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
