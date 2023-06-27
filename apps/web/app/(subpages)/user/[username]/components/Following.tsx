
import { UsersIcon } from '@heroicons/react/24/outline';
import { Virtuoso } from 'react-virtuoso';
import { Pagination, ProfileInformation, useGetFollowingQuery } from '@social-zone/graphql';
import type { FC } from 'react';
import { useState } from 'react';
import { EmptyState, ErrorMessage } from '~ui';

interface FollowingProps {
  profile: ProfileInformation
  onProfileSelected?: (profile: Pagination) => void;
}

const Following: FC<FollowingProps> = ({ profile, onProfileSelected }) => {
  const [hasMore, setHasMore] = useState(true);

    const {data,isFetched,refetch} =useGetFollowingQuery({options:{limit:15},query:{target:profile.id}})

  const followings = data?.getFollowing
  

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }

    // await refetch({
      
    // }).then(({ data }) => {
    //   setHasMore(data?.following?.length > 0);
    // });
  };

 

  if (followings?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{profile.username}
            </span>
            <span>
              doesn’t follow anyone.
            </span>
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
        data={followings}
        endReached={onEndReached}
        itemContent={(index: any, following:any) => {
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
              {/* <UserProfile
                profile={following}
                linkToProfile={!onProfileSelected}
                isFollowing={following?.profile?.isFollowedByMe}
                followUnfollowPosition={index + 1}
                followUnfollowSource={FollowUnfollowSource.FOLLOWING_MODAL}
                showBio
                showFollow
                showUserPreview={false}
              /> */}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Following;
