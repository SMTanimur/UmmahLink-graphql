'use client';


import {  GetRepliesCommentDocument, GetRepliesCommentQuery, GetRepliesCommentQueryVariables, fetcher } from '@social-zone/graphql';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const useGetReplyCommentsQuery = <
TData = GetRepliesCommentQuery,
TError = unknown
>(
variables: GetRepliesCommentQueryVariables,
option?: UseInfiniteQueryOptions<GetRepliesCommentQuery, TError, TData>
) => {
return useInfiniteQuery<GetRepliesCommentQuery, TError, TData>(
  ["commentReplies.infinite", variables],
  ({ pageParam=1 }) =>
  fetcher<GetRepliesCommentQuery, GetRepliesCommentQueryVariables>(
    GetRepliesCommentDocument,
      
       {
        ...variables,
        option:{page:pageParam,limit:variables.option.limit},
        query: variables.query,
       }
    )(),
  option
);
};