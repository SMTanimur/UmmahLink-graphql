import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType('ImageInput', { isAbstract: true })
@ObjectType()
export class ImageInput {
  @Field()
  public_id: string | undefined;

  @Field()
  url: string | undefined;
}