/* eslint-disable react-hooks/rules-of-hooks */


"use client"

// useFeedsQuery.js
import { useInfiniteQuery } from '@tanstack/react-query'; // Import the custom hook
import { useFetchFeeds } from './custom';

export const useFeedsQuery = () => {


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, error } = useInfiniteQuery(
    ['getFeeds'],

    ({ pageParam }) => {
      const result = useFetchFeeds({ pageParam });
      console.log(result,"sjjsk"); // Log the result here to check if it's returning data
      return result;
    },

  
    {
      getNextPageParam: (lastPage) => {
        const { nextPage, totalPages } = lastPage ?? {};
        return nextPage! < totalPages! ? nextPage! + 1 : false;
      },
    }
  );



  const flattenedData = data?.pages.flatMap((page) => page?.docs) ?? [];


  return {
    Feed: flattenedData,
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: fetchNextPage,
    hasMore: Boolean(hasNextPage),
  };
};
