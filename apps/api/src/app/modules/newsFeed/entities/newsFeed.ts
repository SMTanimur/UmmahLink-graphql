import { Field, ID, InputType, ObjectType} from '@nestjs/graphql';



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CoreEntity } from '@social-zone/common';





@ObjectType()
@Schema({ versionKey: false, timestamps: true })
@InputType('NewsFeedInputType', { isAbstract: true })
export class NewsFeed extends CoreEntity {

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field(() => ID)
  follower: string

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Post'})
  @Field(() => ID)
  post: string

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field(() => ID)
  post_owner: string

}

export type NewsFeedDocument = NewsFeed & Document
export const NewsFeedSchema = SchemaFactory.createForClass(NewsFeed);
