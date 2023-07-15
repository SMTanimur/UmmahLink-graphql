import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResponseSingleUpload {
  @Field(() => String)
  url!: string;
}
