"use client"

import { useInfiniteGetPostsQuery } from '@social-zone/graphql';
import React, { useState } from 'react';

export const usePostQuery = (username:string) => {

  const [cursor, setCursor] = useState<number>(2);

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
  } = useInfiniteGetPostsQuery(
    'option', 
    { 
      username,
      option: {limit:pageSize,page:cursor},
      query: {},
    },
    {
      getNextPageParam: (lastPage,pages) => {
        // if (Math.ceil(lastPage?.getFeeds!.totalPages / pageSize) > pages.length)
        // return pages.length;
        //  return undefined;
        console.log(lastPage?.getPosts?.nextPage,"nextsjs")

        if(lastPage?.getPosts?.hasNextPage) return lastPage.getPosts.nextPage
      },
    }

  
    
   
  );


 
  const flattenedData = data?.pages.flatMap((page) => page.getPosts?.docs) ?? [];

  // React.useEffect(()=>{
  //   if(hasNextPage) setCursor(cursor+1)
  // },[cursor, hasNextPage])

    return {
      Posts: flattenedData,
      isLoading,
      error,
      isError,
      isFetching,
      isLoadingMore: isFetchingNextPage,
      loadMore: fetchNextPage,
      hasMore: Boolean(hasNextPage),
    };
};
