import { useInfiniteGetFeedQuery } from "@social-zone/graphql";

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
    option:{limit:3},
    query:{}
   },
    {
      getNextPageParam: ({getFeeds:{page} }) => ({ page: page + 1 }),
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  function mapPaginatorData(page:any) {
    return {
      currentPage: page.getFeeds.page,
      perPage: page.getFeeds.limit,
      total: page.getFeeds.totalDocs,
      totalPages: page.getFeeds.totalPages,
    };
  }

  const flattenedData = data?.pages.flatMap((page) => page.getFeeds.docs) ?? [];
  const paginatorInfo = Array.isArray(data?.pages)? mapPaginatorData(data?.pages[data.pages.length - 1]) : null;

  return {
    Feed: flattenedData,
    paginatorInfo,
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}
 