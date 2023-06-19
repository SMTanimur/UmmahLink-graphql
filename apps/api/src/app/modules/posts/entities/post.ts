import { Field, ID, InputType, ObjectType} from '@nestjs/graphql';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { CoreEntity } from '@social-zone/common';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';




@ObjectType()
@Schema({ versionKey: false ,timestamps:true})
@InputType('PostInputType', { isAbstract: true })
export class Post extends CoreEntity {

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field((_type) =>User, { nullable: true })
  author: User;

  @Prop()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  content: string;

  @IsOptional()
  @IsString()
  @Prop()
  @Field(() => String, { nullable: true })
  image?: string;
  

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

}

export type PostDocument = Post & Document
export const PostSchema = SchemaFactory.createForClass(Post);
