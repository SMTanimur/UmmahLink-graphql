'use client';

import {
  GetFollowingDocument,
  GetFollowingQuery,
  GetFollowingQueryVariables,
  fetcher
} from '@social-zone/graphql';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const useGetFollowingQuery = <
TData = GetFollowingQuery,
TError = unknown
>(
variables: GetFollowingQueryVariables,
options?: UseInfiniteQueryOptions<GetFollowingQuery, TError, TData>
) => {
return useInfiniteQuery<GetFollowingQuery, TError, TData>(
  ["following.infinite", variables],
  ({ pageParam=1 }) =>
  fetcher<GetFollowingQuery, GetFollowingQueryVariables>(
    GetFollowingDocument,
      
       {
        ...variables,
        options:{page:pageParam,limit:variables.options.limit},
        query: variables.query,
       }
    )(),
  options
);
};

