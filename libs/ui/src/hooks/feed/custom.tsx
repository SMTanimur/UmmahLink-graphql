"use client"

import { useGetFeedQuery } from '@social-zone/graphql';
import {  useInfiniteQuery } from '@tanstack/react-query';


export const useFeedsQuery = () => {
const getFeeds = useGetFeedQuery
getFeeds({option:{limit:5,page:1},query:{}})


const pageSize=5

const {
  data,
  isLoading,
  error,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
} = useInfiniteQuery(
  ['feeds'], // Replace 'page' with the actual name of the key for the page parameter in GetFeedQueryVariables
  ({pageParam =1})=>{
   const {data} =  getFeeds({option:{limit:pageSize,page:pageParam},query:{}})
   return data?.getFeeds
  },
  {
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNextPage) {
        console.log(lastPage.nextPage,"nextsjs")
        return lastPage?.nextPage;
      }
      return null;
    },
  }
);

const flattenedData = data?.pages.flatMap((page) => page?.docs) ?? [];

return {
  Feed: flattenedData,
  isLoading,
  error,
  isError,
  isFetching,
  isLoadingMore: isFetchingNextPage,
  loadMore: () => fetchNextPage(),
  hasMore: Boolean(hasNextPage),
};
};
