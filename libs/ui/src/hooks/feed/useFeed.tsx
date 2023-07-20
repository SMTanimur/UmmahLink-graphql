
import { useInfiniteGetFeedQuery } from '@social-zone/graphql';

export const useFeedQuery = () => {



 const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteGetFeedQuery(
    'option', 
    {
      option: { limit: 3},
      query: {},
    },
    {
      getNextPageParam: ({ getFeeds }) => {
    
        const { nextPage, page } = getFeeds ?? {};
        return nextPage ?? page + 1
      },
    }
    
   
  );


 
  const flattenedData = data?.pages.flatMap((page) => page.getFeeds.docs) ?? [];

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
