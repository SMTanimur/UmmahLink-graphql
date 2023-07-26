"use client"
import { fetcher, GetFeedDocument, GetFeedQuery, GetFeedQueryVariables } from "@social-zone/graphql";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";


 export const useInfiniteFeeds = <
  TData = GetFeedQuery,
  TError = unknown
>(
  variables: GetFeedQueryVariables,
  options?: UseInfiniteQueryOptions<GetFeedQuery, TError, TData>
) => {
  return useInfiniteQuery<GetFeedQuery, TError, TData>(
    ["Feeds", variables],
    ({ pageParam=1 }) =>
    fetcher<GetFeedQuery, GetFeedQueryVariables>(
      GetFeedDocument,
        
         {
          ...variables,
          option:{page:pageParam,limit:variables.option.limit},
          query: variables.query,
         }
      )(),
    options
  );
};

