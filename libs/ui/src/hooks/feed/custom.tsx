// Custom hook to fetch feeds using useGetFeedQuery
import { useGetFeedQuery } from '@social-zone/graphql';

export const useFetchFeeds = ({ pageParam = 1 as number}) => {
  const { data } = useGetFeedQuery({ option: { page: 1, limit: 3 }, query: {} });
  return data?.getFeeds;
};