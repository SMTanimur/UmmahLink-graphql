"use client"

import { NextPage } from "next";
import { useState } from "react";
import { GridItemEight, GridItemFour, GridLayout, NewPost, useAuth } from "~ui";
import FeedType, { Type } from "./components/FeedType";
import RecommendedProfiles from "./components/RecommendedProfiles";
import EnableMessages from "./components/EnableMessages";


const Home: NextPage = () => {
  const {isAuthenticated}=useAuth()
  const [feedType, setFeedType] = useState<Type>(Type.FOLLOWING);

  return (
    <>
  
      {/* {!isAuthenticated && <Hero />} */}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {isAuthenticated && (
            <>
              <NewPost />
              <FeedType feedType={feedType} setFeedType={setFeedType} />
             
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
