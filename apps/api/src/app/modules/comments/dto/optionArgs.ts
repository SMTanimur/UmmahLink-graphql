
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { PaginateOptionArgs } from '@social-zone/common';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});


export enum QueryPostOrderByColumn {
  CREATED_AT = 'createdAt',
  RATING = 'rating',
  ORDERS = 'orders',
  UPDATED_AT = 'updatedAt',
}

registerEnumType(QueryPostOrderByColumn, {
  name: 'QueryPostOrderByColumn',
});


@InputType({isAbstract:true})
export class GetFeedDto extends PaginateOptionArgs {
  @IsEnum(QueryPostOrderByColumn)
  @Field(() => QueryPostOrderByColumn, { nullable: true,defaultValue:QueryPostOrderByColumn.CREATED_AT })
  // @IsOptional()
  orderBy?: QueryPostOrderByColumn = QueryPostOrderByColumn.CREATED_AT;

  @IsEnum(SortOrder)
  @Field(() => SortOrder, { nullable: true,defaultValue:SortOrder.DESC })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC

}