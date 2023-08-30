'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import {
  Card,
  Footer,
  GridItemEight,
  GridItemFour,
  GridLayout,
  NewPost,
  PostItem,
  Spinner,
  useAuth,
  useInfiniteFeeds,
  useProfileQuery,
  useUserProfile,
} from '~ui';
import FeedType, { Type } from './components/FeedType';
import RecommendedProfiles from './components/RecommendedProfiles';
import WithoutUser from './home/WithoutUser';
import Followers from './(subpages)/user/[username]/components/Followers';
import { ProfileInformation } from '@social-zone/graphql';
import Following from './(subpages)/user/[username]/components/Following';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();
  const [feedType, setFeedType] = useState<Type>(Type.FEED);
  const { data: me } = useProfileQuery();
  const { data } = useUserProfile(me?.me.username as string);

  const {
    data: feed,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteFeeds(
    {
      option: { limit: 2 },
      query: {},
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.getFeeds?.nextPage;
      },
    }
  );

  const FeedData = feed?.pages.flatMap((page) => page.getFeeds?.docs) ?? [];


  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: () => fetchNextPage(),
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });


  if (!isAuthenticated) return <WithoutUser />;
  return  isAuthenticated && (
    <div className="relative">
      <GridLayout>
        <GridItemEight className="space-y-5  ">
          {isAuthenticated && (
            <>
              <NewPost />
              <FeedType feedType={feedType} setFeedType={setFeedType} />
              {/* ---- NEWS FEED ---- */}

              <Card className="divide-y-[1px] dark:divide-gray-700">
                {feedType === Type.FOLLOWERS ? (
                  <Followers profile={data?.user as ProfileInformation} />
                ) : feedType === Type.FOLLOWING ? (
                  <Following profile={data?.user as ProfileInformation} />
                ) : (
                  <>
                    { FeedData.length > 0 &&  FeedData?.map(
                      (post: any, index) =>
                         ( // avoid render posts with null author
                          <PostItem
                            key={index}
                            post={post}
                            isAuth={isAuthenticated}
                          />
                        )
                    )}

                    {hasNextPage ? (
                      <div className="flex flex-col items-center justify-center ">
                        <div ref={sentryRef}>
                          <Spinner size="md" variant="primary" />
                        </div>
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
              </Card>
            </>
          )}
        </GridItemEight>
        <GridItemFour className="space-y-5">
          <div className="sticky text-sm leading-7 top-20">
            {isAuthenticated ? (
              <>
                {/* <EnableMessages /> */}
                <RecommendedProfiles />
              </>
            ) : null}
            <Footer />
          </div>
        </GridItemFour>
      </GridLayout>
    </div>
  );
};

export default Home;
