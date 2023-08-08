"use client"

import { UsersIcon } from '@heroicons/react/24/outline';
import { Virtuoso } from 'react-virtuoso';
import {
  Pagination,
  ProfileInformation
} from '@social-zone/graphql';
import type { FC } from 'react';
import { EmptyState, useGetFollowingQuery, useProfileQuery } from '~ui';
import UserProfile from './UserProfile';

interface FollowingProps {
  profile: ProfileInformation;
  onProfileSelected?: (profile: Pagination) => void;
}

const Following: FC<FollowingProps> = ({ profile, onProfileSelected }) => {
 
  const {
    data:followers,
    error,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
   
  } = useGetFollowingQuery(
    {
      options: {limit:5 },
      query: {},
      username: profile?.username as string,
    },
    {
      // Infinite query
      getNextPageParam: (lastPage) => {
         return lastPage?.getFollowing?.nextPage
      },
    }
  );
 const FollowingData = followers?.pages.flatMap((page) => page.getFollowing?.docs) ?? [];

  const onEndReached = async () => {
    if (!hasNextPage) {
      return;
    }
    fetchNextPage()
  };

  if (FollowingData?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">@{profile.username}</span>
            <span>doesn’t follow anyone.</span>
          </div>
        }
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <div
      className="max-h-[80vh] overflow-y-auto"
      data-testid="followings-modal"
    >
      <Virtuoso
        className="virtual-profile-list"
        data={FollowingData as Pagination[]}
        endReached={onEndReached}
        itemContent={(index: any, following: Pagination) => {
          return (
            <div
              className={`p-5 ${
                onProfileSelected &&
                'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900'
              }`}
              onClick={
                onProfileSelected && following
                  ? () => {
                      onProfileSelected(following as Pagination);
                    }
                  : undefined
              }
              aria-hidden="true"
            >
              <UserProfile
                profile={following as Pagination}
                linkToProfile={!onProfileSelected}
                isFollowing={following?.isFollowing}
                followUnfollowPosition={index + 1}
                // followUnfollowSource={FollowUnfollowSource.FOLLOWING_MODAL}
                showBio
                showFollow
                showUserPreview={false}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default Following;
