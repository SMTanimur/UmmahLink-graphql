import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class CoreEntity {
  @Field(() => ID)
  id: number | undefined;
  @Type(() => Date)
  created_at: Date | undefined;
  @Type(() => Date)
  updated_at!: Date;
}
