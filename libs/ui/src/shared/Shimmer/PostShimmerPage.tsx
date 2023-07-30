"use client"


import type { FC } from 'react';
import { Card, GridItemEight, GridItemFour, GridLayout } from '../../components';
import { PostShimmer } from './PostShimmer';
import { PostsShimmer } from './PostsShimmer';
import { UserProfileShimmer } from './UserProfileShimmer';
import { Footer } from '../Footer';

export const PostPageShimmer: FC = () => {
  return (


    <GridLayout>
      <GridItemEight className="space-y-5">
        <Card>
          <PostShimmer />
        </Card>
        <PostsShimmer />
      </GridItemEight>
      <GridItemFour className="space-y-5">
        <Card className="p-5">
          <UserProfileShimmer />
        </Card>
        <Card className="space-y-4 p-5">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </Card>
        <Card className="flex justify-between p-5">
          <div className="shimmer h-3 w-1/2 rounded-lg" />
          <div className="shimmer h-3 w-1/4 rounded-lg" />
        </Card>
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};


