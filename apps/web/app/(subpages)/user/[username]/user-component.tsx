'use client';

import { ProfileInformation } from '@social-zone/graphql';
import { useState } from 'react';
import {
  Button,
  GridItemEight,
  GridItemFour,
  GridLayout,
  NewPost,
  PostItem,
  ProfilePostType,
  STATIC_IMAGES_URL,
  useAuth,
  usePostQuery,
  useProfileQuery,
  useUserProfile,
} from '~ui';
import Cover from './components/Cover';
import Details from './components/Details';
import FeedType from './components/FeedType';
import Followers from './components/Followers';
import Following from './components/Following';
import Info from './components/Info';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type UserComponentProps = {
  username: string;
  type: string;
};

export default function UserComponent({ username, type }: UserComponentProps) {
  const { isAuthenticated } = useAuth();
  const { data } = useUserProfile(username);
  const {
    data: post,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = usePostQuery(
    {
      option: { limit: 5 },
      query: {},
      username: data?.user?.username as string,
    },
    {
      // Infinite query
      getNextPageParam: (lastPage) => {
        return lastPage?.getPosts?.nextPage;
      },
    }
  );
  const PostsData = post?.pages.flatMap((page) => page.getPosts?.docs) ?? [];
  const { data: me } = useProfileQuery();
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: () => fetchNextPage(),
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });
  const [following, setFollowing] = useState<boolean | null>(null);

  const [feedType, setFeedType] = useState(
    type && ['feed', 'info', 'following', 'followers'].includes(type as string)
      ? type.toString().toUpperCase()
      : ProfilePostType
  );
  return (
    <>
      {data?.user && (
        <Cover
          cover={
            data?.user?.coverPicture?.coverUrl
              ? data?.user?.coverPicture.coverUrl
              : `${STATIC_IMAGES_URL}/patterns/2.svg`
          }
        />
      )}

      <GridLayout className="pt-6">
        <GridItemFour>
          <Details
            profile={data?.user as ProfileInformation}
            following={Boolean(following)}
            setFollowing={setFollowing}
          />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType as string} />
          {me?.me?._id === data?.user?.id ? <NewPost /> : null}

          {feedType === ProfilePostType.Followers ? (
            <Followers profile={data?.user as ProfileInformation} />
          ) : feedType === ProfilePostType.Following ? (
            <Following profile={data?.user as ProfileInformation} />
          ) : feedType === ProfilePostType.Info ? (
            <Info profile={data?.user as ProfileInformation} />
          ) : (
            <>
              {PostsData?.map(
                (post: any, index) =>
                  post?.author && ( // avoid render posts with null author
                    <PostItem
                      key={index}
                      post={post!}
                      isAuth={isAuthenticated}
                    />
                  )
              )}

              {hasNextPage ? (
                <div className="flex flex-col items-center justify-center ">
                  <Button
                    ref={sentryRef}
                    className="h-11 text-sm font-semibold md:text-base items-center "
                  >
                    Loading More
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <p className="text-sm text-gray-400">
                    There is no post to show
                  </p>
                </div>
              )}
            </>
          )}
        </GridItemEight>
      </GridLayout>
    </>
  );
}
