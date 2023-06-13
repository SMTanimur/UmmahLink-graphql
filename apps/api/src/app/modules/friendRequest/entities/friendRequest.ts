import { Field, ID, InputType, ObjectType} from '@nestjs/graphql';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { CoreEntity } from '@social-zone/common';




@ObjectType()
@Schema({ versionKey: false ,timestamps:true})
@InputType('FriendRequestInputType', { isAbstract: true })
export class FriendRequest extends CoreEntity {

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field((_type) =>ID, { nullable: true })
  user: User;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field((_type) => ID, { nullable: true })
  target:User
}

export type FriendRequestDocument = FriendRequest & Document
export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
