import { Field, ID, InputType, ObjectType} from '@nestjs/graphql';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { CoreEntity } from '@social-zone/common';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';




@ObjectType()
@Schema({ versionKey: false ,timestamps:true})
@InputType('PostInputType', { isAbstract: true })
export class Post  {

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field((_type) =>User, { nullable: true })
  _author_id: User;

  @Prop()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  content: string;

  @IsOptional()
  @IsArray()
  @Prop({default:[]})
  @Field(() =>[ String], { nullable: true })
  photos?: [string]
  

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,default:[] }]})
  @IsOptional()
  @IsArray()
  @IsMongoId({each:true})
  @Field(() => [User], { nullable: true })
  likes?:User[]

  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,default:[] }]})
  @IsOptional()
  @IsArray()
  @IsMongoId({each:true})
  @Field(() => [User], { nullable: true })
  comments?:User[]

  @Prop()
  @Field(() => Date, { description: 'Created At' })
  createdAt: Date

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt: Date

}

export  interface PostDocument extends Post, Document{
  isPostLiked(userID:string):boolean
}
export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.virtual('author', {
  ref: 'User',
  localField: '_author_id',
  foreignField: '_id',
  justOne: true
});


PostSchema.methods.isPostLiked = function (this:Post, userID) {
  if (userID) return;

  return this.likes.some(user => {
      return user.toString() === userID.toString();
  });
}