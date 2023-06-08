import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import {  ImageInput } from '@social-zone/common';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { Field, InputType, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql';
import { IsEmail,IsNotEmpty,IsString,IsOptional,ValidateNested,IsBoolean,Min} from 'class-validator';



export enum EGender {
  male = 'male',
  female = 'female',
  unspecified = 'unspecified'
}

registerEnumType(EGender, {
  name: 'EGender',
})


export interface InfoDocument
  extends Document,
    mongoose.Types.Subdocument,
    Info {}

@ObjectType()
@Schema()
@InputType({isAbstract:true})
export class Info {
 @Prop()
 @IsOptional()
 @IsString()
 @Field({nullable:true})
 bio?: string;

  @Prop()
  @IsOptional()
  @Field()
  birthday?: Date
 
  @IsOptional()
  @Field(()=>EGender,{nullable:true})
  @Prop({enum:EGender}) 
  gender?: EGender
}

export const InfoSchema = SchemaFactory.createForClass(Info);


@ObjectType()
@Schema({ versionKey: false })
export class User {
  @Prop({unique:true})
  @IsEmail()
  @IsNotEmpty()
  @Field(()=>String)
  email: string;

  @Prop()
  @IsOptional()
  @Field(()=>String,{nullable:true})
  firstName?: string;

  @Prop()
  @IsOptional()
  @Field({nullable:true})
  lastName?: string;

  @Prop()
  @IsOptional()
  @Field({nullable:true})
  phone?: string;

  @Prop({ type: InfoSchema })
  @IsOptional()
  @Field(()=>Info,{nullable:true})
  info?: Info;

  @Prop({unique:true})
  @IsNotEmpty()
  @IsString()
  @Field(()=>String)
  username: string;


  @Field(() => ImageInput, { nullable: true })
  @Prop(raw({ public_id: String, url: String }))
  @IsOptional()
  @ValidateNested()
  profilePicture?: ImageInput;

  @Field(() => ImageInput, { nullable: true })
  @Prop(raw({ public_id: String, url: String }))
  @IsOptional()
  @ValidateNested()
  coverPicture?: ImageInput

  @Prop()
  @IsOptional()
  @IsBoolean()
  @Field(()=>Boolean,{nullable:true})
  isOwnProfile?: boolean;

  @Prop()
  @IsString()
  @Field(()=>String)
  password: string;


}

export interface UserDocument extends User,Document {
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