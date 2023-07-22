"use client"
import { useInfiniteGetFeedQuery } from '@social-zone/graphql';
import React, { useState } from 'react';

export const useFeedQuery = () => {

  const [cursor, setCursor] = useState<number>(1);

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
  } = useInfiniteGetFeedQuery(
    'option', 
    {
      option: {limit:pageSize},
      query: {},
    },
    {
      getNextPageParam: (lastPage,pages) => {
        // if (Math.ceil(lastPage?.getFeeds!.totalPages / pageSize) > pages.length)
        // return pages.length;
        //  return undefined;
        console.log(lastPage?.getFeeds?.nextPage,"nextsjs")

        if(lastPage?.getFeeds?.hasNextPage) return lastPage.getFeeds.nextPage
      },
    }

  
    
   
  );


 
  const flattenedData = data?.pages.flatMap((page) => page.getFeeds?.docs) ?? [];



    return {
      Feed: flattenedData,
      isLoading,
      error,
      isError,
      isFetching,
      isLoadingMore: isFetchingNextPage,
      loadMore: fetchNextPage,
      hasMore: Boolean(hasNextPage),
    };
};
