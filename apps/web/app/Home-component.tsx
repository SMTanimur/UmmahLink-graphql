"use client"

import { NextPage } from "next";
import { useState } from "react";
import { Button, GridItemEight, GridItemFour, GridLayout, NewPost, PostItem, useAuth, useFeedQuery } from "~ui";
import FeedType, { Type } from "./components/FeedType";
import RecommendedProfiles from "./components/RecommendedProfiles";
import EnableMessages from "./components/EnableMessages";
import { NewsFeedPaginate } from "@social-zone/graphql";



const Home: NextPage = () => {
  const {isAuthenticated}=useAuth()
  const [feedType, setFeedType] = useState<Type>(Type.FOLLOWING);
  const {Feed,error,hasMore,isFetching,isLoading,isLoadingMore,loadMore,paginatorInfo}=useFeedQuery()
  return (
    <>
  
      {/* {!isAuthenticated && <Hero />} */}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {isAuthenticated && (
            <>
              <NewPost />
              <FeedType feedType={feedType} setFeedType={setFeedType} />
               {/* ---- NEWS FEED ---- */}
        {(Feed?.length !== 0) && (
          <>

              {Feed?.map((post: any) => post.author && ( // avoid render posts with null author
              
                    <PostItem
                      key={post.id}
                      post={post!}
                      isAuth={isAuthenticated}
                    />
                  
              
              ))}

    {hasMore && (
        <div className="mt-8 flex justify-center lg:mt-12">
          <Button
            onClick={loadMore}
            className="h-11 text-sm font-semibold md:text-base"
          >
           Loading More
          </Button>
        </div>
      )}
         
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
          ) || null}
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
