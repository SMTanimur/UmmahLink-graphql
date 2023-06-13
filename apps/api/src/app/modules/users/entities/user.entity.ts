import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Info } from '../../Info/entities/info';
import { Type } from 'class-transformer';

@ObjectType()
@InputType('UserInputType', { isAbstract: true })
@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Info',
    autopopulate: true,
  })
  @ValidateNested()
  @Type(() => Info)
  @IsOptional()
  @Field(() => Info, { nullable: true })
  info?: Info;

  @Prop({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  username: string;

  @Field({ nullable: true })
  @Prop({
    default:
      'https://res.cloudinary.com/dk6bdrkbv/image/upload/v1658841812/mushfiqTanim/user_qcrqny_kcgfes.svg',
  })
  @IsOptional()
  avatar?: string;

  @Field({ nullable: true })
  @Prop()
  @IsOptional()
  coverPicture?: string;

  @ValidateNested({each:true})
  @IsMongoId({ each: true })
  @IsArray()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  })
  @Field(() => User, { nullable: true })
  friends?: User[];


  @ValidateNested({each:true})
  @IsMongoId({ each: true })
  @IsArray()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  })
  @Field(() => User, { nullable: true })
  friendRequests?: User[];

  @Prop()
  @IsString()
  @Field(() => String)
  password: string;

  @Prop({
    enum: ['admin', 'user'],
    default: 'user',
  })
  @Field(() => String)
  @IsNotEmpty({ message: 'Role is required' })
  @IsString()
  role: string;
}

export interface UserDocument extends User, Document {
  comparePassword(password: string): Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password);
};

@ObjectType()
export class UserWithoutPassword extends OmitType(User, ['password']) {}
