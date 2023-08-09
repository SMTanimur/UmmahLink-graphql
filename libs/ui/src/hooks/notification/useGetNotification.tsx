'use client';

import {
  GetNotificationsDocument,
  GetNotificationsQuery,
  GetNotificationsQueryVariables,
  fetcher
} from '@social-zone/graphql';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const useGetNotificationsQuery = <
TData = GetNotificationsQuery,
TError = unknown
>(
variables: GetNotificationsQueryVariables,
options?: UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>
) => {
return useInfiniteQuery<GetNotificationsQuery, TError, TData>(
  ["notifications.infinite", variables],
  ({ pageParam=1 }) =>
  fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
      
       {
        ...variables,
        options:{page:pageParam,limit:variables.options.limit},
        query: variables.query,
       }
    )(),
  options
);
};
