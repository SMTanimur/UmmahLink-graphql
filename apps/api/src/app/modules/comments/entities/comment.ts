/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CoreEntity } from '@social-zone/common';
import { User } from '../../users/entities/user.entity';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Post } from '../../posts/entities/post';

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
@InputType('CommentInputType', { isAbstract: true })
export class Comment extends CoreEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  @Field((_type) => ID, { nullable: true })
  _post_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  })
  @Field((_type) => ID, { nullable: true })
  parent?: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
      },
    ],
  })
  @IsArray()
  @ValidateNested({each:true})
  @Field((_type) => [ID], { nullable: true })
  parents: string[];

  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  body: string;

  @Prop({ type: Number, default: 1 })
  @IsNumber()
  @Field(() => Number, { nullable: true })
  depth: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field((_type) => User, { nullable: true })
  authId: User

  @Prop({ type: Boolean, default: false })
  @Field(() => Boolean, { nullable: true })
  isEdited:boolean

}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.virtual('author', {
  ref: 'User',
  localField: 'authId',
  foreignField: '_id',
  justOne: true
});
