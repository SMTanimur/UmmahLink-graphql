
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
@InputType({isAbstract:true})
export class PaginateOptionArgs {
  @Field({ nullable: true })
  select: string;

  @Field({ nullable: true })
  sort: string;

  @Field({ nullable: true })
  lean: boolean;

  @Field({ nullable: true })
  leanWithId: boolean;

  @Field({ nullable: true })
  offset: number;

  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  limit: number;

  /* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
  @Field({ nullable: true })
  pagination: boolean;

  @Field({ nullable: true })
  allowDiskUse: boolean;

  @Field({ nullable: true })
  forceCountFn: boolean;

  @Field({ nullable: true })
  useEstimatedCount: boolean;
}