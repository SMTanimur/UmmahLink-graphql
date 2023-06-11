import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { Field, InputType, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql';
import { IsEmail,IsNotEmpty,IsString,IsOptional,IsBoolean} from 'class-validator';



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


  @Field( { nullable: true })
  @Prop({
    default:
      'https://res.cloudinary.com/dk6bdrkbv/image/upload/v1658841812/mushfiqTanim/user_qcrqny_kcgfes.svg',
  })
  @IsOptional()
  avatar?: string

  @Field( { nullable: true })
  @Prop()
  @IsOptional()
  coverPicture?: string

  @Prop()
  @IsOptional()
  @IsBoolean()
  @Field(()=>Boolean,{nullable:true})
  isOwnProfile?: boolean;

  @Prop()
  @IsString()
  @Field(()=>String)
  password: string;


  @Prop({
    enum: ['admin', 'user'],
    default: 'user',
  })
  @Field(()=>String)
  @IsNotEmpty({ message: 'Role is required' })
  @IsString()
  role: string;


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