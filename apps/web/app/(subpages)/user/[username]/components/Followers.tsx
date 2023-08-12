"use client"

import { UsersIcon } from "@heroicons/react/24/outline";
import { Pagination, ProfileInformation } from "@social-zone/graphql";
import { Virtuoso } from 'react-virtuoso';
import { FC } from "react";
import { EmptyState, ErrorMessage, useGetFollowersQuery } from "~ui";
import UserProfile from "./UserProfile";
import { useProfileQuery } from "~ui";


interface FollowersProps {
  profile: ProfileInformation
}

const Followers: FC<FollowersProps> = ({ profile }) => {

  console.log(profile)
  
  // Variables
 
  const {
    data:followers,
    error,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
   
  } = useGetFollowersQuery(
    {
      options: {limit:10 },
      query: {},
      username: profile?.username as string,
    },
    {
      // Infinite query
      getNextPageParam: (lastPage) => {
         return lastPage?.getFollowers?.nextPage
      },
    }
  );
 const FollowersData = followers?.pages.flatMap((page) => page.getFollowers?.docs) ?? [];
  const hasMore = hasNextPage

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }
   fetchNextPage()
   
  };
  if (Followers?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{profile?.username}
            </span>
            <span>
              <span>doesn’t have any followers yet.</span>
            </span>
          </div>
        }
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto" data-testid="followers-modal">
      <ErrorMessage
        className="m-5"
        title={`Failed to load followers`}
        error={error as any}
      />
      <Virtuoso
        className="virtual-profile-list"
        data={FollowersData as Pagination[]}
        endReached={onEndReached}
        itemContent={(index: any, follower:Pagination) => {
          return (
            <div className="p-5">
              {profile ? (
                <UserProfile
                  profile={follower as Pagination}
                  isFollowing={follower?.isFollowing}
                  followUnfollowPosition={index + 1}
                  showBio
                  showFollow={
                    !profile?.isOwnProfile
                  }
                  showUserPreview={false}
                />
              ) : 
                null
              }
            </div>
          );
        }}
      />
    </div>
  );
};

export default Followers;
