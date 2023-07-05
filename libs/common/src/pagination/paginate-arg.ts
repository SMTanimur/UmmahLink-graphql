
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
@ArgsType()
@InputType({isAbstract:true})
export class PaginateOptionArgs {
  @Field({ nullable: true })
  select: string;

  @Field({ nullable: true })
  sort: string;

  @Field({ nullable: true })
  skip: number

  @Field({ nullable: true })
  lean: boolean;

  @Field({ nullable: true })
  leanWithId: boolean;

  @Field({ nullable: true })
  offset: number;

  @IsOptional()
  @Field({ nullable: true })
  @Transform((val) => parseInt(val.value))
  public limit?: number = 15;

  @Field({ nullable: true })
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public page?: number = 1;

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