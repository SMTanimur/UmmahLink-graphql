'use client';

import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
  fetcher,
} from '@social-zone/graphql';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const usePostQuery = <
TData = GetPostsQuery,
TError = unknown
>(
variables: GetPostsQueryVariables,
options?: UseInfiniteQueryOptions<GetPostsQuery, TError, TData>
) => {
return useInfiniteQuery<GetPostsQuery, TError, TData>(
  ["Posts", variables],
  ({ pageParam=1 }) =>
  fetcher<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
      
       {
        ...variables,
        option:{page:pageParam,limit:variables.option.limit},
        query: variables.query,
       }
    )(),
  options
);
};

