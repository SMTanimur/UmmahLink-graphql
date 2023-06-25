import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FollowOrUnFollowInput {
  @Field(() => ID, { nullable: true })
  userId: string;

  @Field(() => ID)
  follow_ID: string;
}
