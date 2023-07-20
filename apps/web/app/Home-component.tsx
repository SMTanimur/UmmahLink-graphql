'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import {
  Button,
  GridItemEight,
  GridItemFour,
  GridLayout,
  NewPost,
  PostItem,
  useAuth,
  useFeedQuery,

} from '~ui';
import FeedType, { Type } from './components/FeedType';
import InfiniteScroll from 'react-infinite-scroller';
import RecommendedProfiles from './components/RecommendedProfiles';
import EnableMessages from './components/EnableMessages';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();
  const [feedType, setFeedType] = useState<Type>(Type.FOLLOWING);
  const { Feed, hasMore, isLoadingMore, loadMore,isFetching } = useFeedQuery();
  return (
    <>
      {/* {!isAuthenticated && <Hero />} */}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {(isAuthenticated && (
            <>
              <NewPost />
              <FeedType feedType={feedType} setFeedType={setFeedType} />
              {/* ---- NEWS FEED ---- */}
              {Feed?.length !== 0 && (
                <>
                  <InfiniteScroll
                    hasMore={hasMore}
                    loadMore={() => loadMore}
                    className=""
                  >
                    {Feed?.map(
                      (post: any, index) =>
                        post.author && ( // avoid render posts with null author
                          <PostItem
                            key={index}
                            post={post!}
                            isAuth={isAuthenticated}
                          />
                        )
                    )}

                    {isFetching && <div>Loading more...</div>}
                    {hasMore && (
                      <Button
                          onClick={() => loadMore()}
                          className="h-11 text-sm font-semibold md:text-base"
                          disabled={isLoadingMore}
                        >
                          Loading More
                        </Button>
                    )}
                  
                  </InfiniteScroll>

                  {/* {state.isLoadingFeed && (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            )}
            {state.error && (
              <div className="flex justify-center py-6">
                <p className="text-gray-400 italic">
                  {state.error.error?.message || 'Something went wrong.'}
                </p>
              </div>
            )} */}
                </>
              )}
            </>
          )) ||
            null}
        </GridItemEight>
        <GridItemFour>
          {isAuthenticated ? (
            <>
              <EnableMessages />
              <RecommendedProfiles />
            </>
          ) : null}
        </GridItemFour>
      </GridLayout>
    </>
  );
};

export default Home;
