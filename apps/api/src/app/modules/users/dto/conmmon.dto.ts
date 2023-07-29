import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Schema } from "@nestjs/mongoose";





@ObjectType()
@InputType()
export class AvatarImageInput {
  @Field(() => String)
  avatarUrl: string;

  @Field(() => String)
  avatarPublicId: string;
}



@ObjectType({isAbstract:true})
@InputType({isAbstract:true})
export class CoverImageInput {
  @Field(() => String)
  coverUrl: string;

  @Field(() => String)
  coverPublicId: string;
}