import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  Field,
  GraphQLISODateTime,
  InputType,
  ObjectType,
  OmitType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsMongoId,
  IsDate,
  IsPhoneNumber
} from 'class-validator';

import { FriendRequest } from '../../friendRequest/entities/friendRequest';

export enum EGender {
  male = 'male',
  female = 'female',
  unspecified = 'unspecified',
}

registerEnumType(EGender, {
  name: 'EGender',
});

// @ObjectType()
// @InputType()
// export class UserInformation {
  

// }

// export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
@ObjectType()
@InputType('UserInputType', { isAbstract: true })
@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @Prop({type:String})
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @Prop({type:Date})
  @IsOptional()
  @IsDate()
  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday?: Date;

  @Prop({ enum: EGender,type:String,default:EGender.unspecified })
  @Field(() => EGender,{nullable:true})
  gender: EGender;

  @Prop({type:String})
  @Field(()=>String,{ nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Prop({type:String})
  @Field(()=>String,{ nullable: true })
  @IsOptional()
  contact?: string;
 
  @Prop({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  username: string;

  @Field({ nullable: true })
  @Prop({type:String,
    default:
      'https://res.cloudinary.com/dk6bdrkbv/image/upload/v1658841812/mushfiqTanim/user_qcrqny_kcgfes.svg',
  })
  @IsOptional()
  avatar?: string;

  @Field({ nullable: true })
  @Prop({type:String})
  @IsOptional()
  coverPicture?: string;

  @ValidateNested({ each: true })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  })
  @Field(() => User, { nullable: true })
  friends?: User[];

  @ValidateNested({ each: true })
  @IsMongoId({ each: true })
  @IsOptional()
  @IsArray()
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendRequest',
        default: [],
        autopopulate: true,
      },
    ],
  })
  @Field(() => [FriendRequest], { nullable: true, defaultValue: [] })
  friendRequests: FriendRequest[];

  @Prop({type:String})
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
  isFollowing?: boolean;
  isOwnProfile?: boolean;
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
