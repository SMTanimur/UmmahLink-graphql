import { Field, GraphQLISODateTime, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';

import {
  IsDate,
  IsOptional,
  IsPhoneNumber,
  IsString,
 
} from 'class-validator';


import { User } from '../../users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreEntity } from '@social-zone/common';
import mongoose, { Document } from 'mongoose';

export enum EGender {
  male = 'male',
  female = 'female',
  unspecified = 'unspecified'
}

registerEnumType(EGender, {
  name: 'EGender',
})



@ObjectType()
@Schema({ versionKey: false })
@InputType('InfoInputType', { isAbstract: true })
export class Info extends CoreEntity {

   @Prop()
   @IsOptional()
   @IsDate()
   @Field(() => GraphQLISODateTime, { nullable: true })
   birthday?: Date
  
   @IsOptional()
   @Field(()=>EGender,{nullable:true})
   @Prop({enum:EGender}) 
   gender?: EGender

  @Prop()
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Prop()
  @Field({ nullable: true })
  @IsPhoneNumber()
  @IsOptional()
  contact?: string;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  @Field(() => User, { nullable: true })
  user?: User;
}

export type InfoDocument = Info & Document
export const InfoSchema = SchemaFactory.createForClass(Info);
