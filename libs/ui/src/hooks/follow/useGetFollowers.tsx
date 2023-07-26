'use client';

import {
  GetFollowersDocument,
  GetFollowersQuery,
  GetFollowersQueryVariables,
  fetcher
} from '@social-zone/graphql';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const useGetFollowersQuery = <
TData = GetFollowersQuery,
TError = unknown
>(
variables: GetFollowersQueryVariables,
options?: UseInfiniteQueryOptions<GetFollowersQuery, TError, TData>
) => {
return useInfiniteQuery<GetFollowersQuery, TError, TData>(
  ["followers.infinite", variables],
  ({ pageParam=1 }) =>
  fetcher<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
      
       {
        ...variables,
        options:{page:pageParam,limit:variables.options.limit},
        query: variables.query,
       }
    )(),
  options
);
};

