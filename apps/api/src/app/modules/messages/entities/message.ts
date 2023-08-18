import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserDocument } from '../../users/entities/user.entity';
import { CoreEntity } from '@social-zone/common';
import { IsBoolean, IsDate, IsString, MinLength } from 'class-validator';

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
@InputType('messageInputType', { isAbstract: true })
export class Message extends CoreEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  @Field((_type) => ID, { nullable: true })
  from: UserDocument

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  @Field((_type) => ID, { nullable: true })
  to: string;

  @Prop({type:String})
  @Field(() => String)
  @IsString()
  @MinLength(2)
  text:string

  @Prop({type:Boolean,default:false})
  @Field(() => Boolean,{defaultValue:false,nullable:true})
  @IsBoolean()
  seen:boolean

  @Prop({type:Date})
  @Field(() => Date)
  @IsDate()
  createdAt:Date
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
