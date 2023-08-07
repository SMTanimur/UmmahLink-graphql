'use client';


import { GetCommentsDocument, GetCommentsQuery, GetCommentsQueryVariables, fetcher } from '@social-zone/graphql';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const useGetCommentsQuery = <
TData = GetCommentsQuery,
TError = unknown
>(
variables: GetCommentsQueryVariables,
option?: UseInfiniteQueryOptions<GetCommentsQuery, TError, TData>
) => {
return useInfiniteQuery<GetCommentsQuery, TError, TData>(
  ["comments.infinite", variables],
  ({ pageParam=1 }) =>
  fetcher<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
      
       {
        ...variables,
        option:{page:pageParam,limit:variables.option.limit},
        query: variables.query,
       }
    )(),
  option
);
};