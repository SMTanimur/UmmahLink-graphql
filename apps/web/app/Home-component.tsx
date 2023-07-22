'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import {
  Button,
  Card,
  Footer,
  GridItemEight,
  GridItemFour,
  GridLayout,
  NewPost,
  PostItem,
  useAuth,
  useFeedQuery,
} from '~ui';
import FeedType, { Type } from './components/FeedType';
import RecommendedProfiles from './components/RecommendedProfiles';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import EnableMessages from './components/EnableMessages';
import WithoutUser from './home/WithoutUser';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();
  const [feedType, setFeedType] = useState<Type>(Type.FOLLOWING);
  const { Feed, hasMore, isLoadingMore, loadMore, isFetching, isError } =
    useFeedQuery();

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage: hasMore ?? false,
    onLoadMore: loadMore,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!isAuthenticated) return <WithoutUser />;
  return (
    <div className='relative'>
      {/* {!isAuthenticated && <Hero />} */}
      <GridLayout>
        <GridItemEight className="space-y-5  ">
          {isAuthenticated && (
            <>
              <NewPost />
              <FeedType feedType={feedType} setFeedType={setFeedType} />
              {/* ---- NEWS FEED ---- */}

              <Card className="divide-y-[1px] dark:divide-gray-700">
                {Feed?.length !== 0 && (
                  <>
                    {Feed?.map(
                      (post: any, index) =>
                        post?.author && ( // avoid render posts with null author
                          <PostItem
                            key={index}
                            post={post!}
                            isAuth={isAuthenticated}
                          />
                        )
                    )}
                  </>
                )}
                {isFetching && <div>Loading more...</div>}
                {hasMore && (
                  <Button
                    ref={sentryRef}
                    className="h-11 text-sm font-semibold md:text-base"
                  >
                    Loading More
                  </Button>
                )}
              </Card>
            </>
          )}
        </GridItemEight>
        <GridItemFour className="space-y-5">
          <div className='sticky text-sm leading-7 top-20'>
          {isAuthenticated ? (
            <>
              <EnableMessages />
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
