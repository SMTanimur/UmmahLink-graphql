import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class NotificationResponse {

  @Field(() => Boolean)
  state: boolean
}
@ObjectType()
export class NotificationCount {

  @Field(() => Int)
  count: number
}