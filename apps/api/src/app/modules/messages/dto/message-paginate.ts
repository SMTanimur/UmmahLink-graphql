import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@social-zone/common';

import { AvatarImage } from '../../users/dto/ProfileData';

@ObjectType()
export class MessageUser {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => AvatarImage, { nullable: true })
  avatar?: AvatarImage;

  @Field(() => String)
  name: string;

  @Field(() => Date, { nullable: true })
  lastActive: Date;

  @Field(() => Boolean,{nullable:true})
  isActive: boolean;
}

@ObjectType()
export class MessagePaginate {
  @Field(() => String)
  text: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => MessageUser)
  from: MessageUser;

  @Field(() => MessageUser)
  to: MessageUser;

  @Field(() => Boolean)
  seen: boolean;

  @Field(() => Boolean)
  unseenCount?: boolean;

  @Field(() => Boolean)
  isOwnMessage?: boolean;

  @Field(() => String)
  id: string;
}

@ObjectType()
export class MessagePagination extends Paginated(MessagePaginate) {}
