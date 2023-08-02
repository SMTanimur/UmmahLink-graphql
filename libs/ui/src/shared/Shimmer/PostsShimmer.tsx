"use client"
import type { FC } from 'react';
import { PostShimmer } from './PostShimmer';
import { Card } from '../../components';



export const PostsShimmer: FC = () => {
  return (
    <Card className="divide-y-[1px] dark:divide-gray-700">
      <PostShimmer />
      <PostShimmer />
      <PostShimmer />
    </Card>
  );
};


