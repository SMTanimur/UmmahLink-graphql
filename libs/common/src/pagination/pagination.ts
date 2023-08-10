import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export function Paginated<TItem>(TItemClass: Type<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [TItemClass], { nullable: 'itemsAndList' })
    docs: TItem[];

    @Field()
    totalDocs: number;

    @Field()
    limit: number;

    // * Page info

    @Field()
    page: number;

    @Field()
    totalPages: number;

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPrevPage: boolean;

    @Field({ nullable: true })
    nextPage: number;

    @Field({ nullable: true })
    prevPage: number;

    @Field()
    pagingCounter: number;
  }
  return PaginatedType;
}