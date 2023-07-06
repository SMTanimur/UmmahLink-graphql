"use client"

import { UsersIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { EmptyState, ErrorMessage, Loader } from '~ui';
import UserProfile from '../(subpages)/user/[username]/components/UserProfile';
import { Pagination, useGetSuggestionPeopleQuery } from '@social-zone/graphql';


const Suggested: FC = () => {

  const {data,isLoading,error}=useGetSuggestionPeopleQuery({options:{limit:2},query:{}})
  console.log(data)
 
  if (isLoading) {
    return <Loader message={`Loading suggested`} />;
  }
  
  if (data?.getSuggestionPeople?.docs?.length === 0) {
    return (
      <EmptyState
        message={`Nothing to suggest`}
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <ErrorMessage title={`Failed to load recommendations`} error={error as any} />
      <Virtuoso
        className="virtual-profile-list"
        data={data?.getSuggestionPeople?.docs as Pagination[]}
        itemContent={(index, profile) => {
          return (
            <div className="flex items-center space-x-3 p-5">
              <div className="w-full">
                <UserProfile
                  profile={profile as Pagination}
                  isFollowing={profile?.isFollowing}
                  followUnfollowPosition={index + 1}
                  // followUnfollowSource={
                  //   FollowUnfollowSource.WHO_TO_FOLLOW_MODAL
                  // }
                  showBio
                  showFollow
                  showUserPreview={false}
                />
              </div>
              {/* <DismissRecommendedProfile
                profile={profile as Profile}
                dismissPosition={index + 1}
                dismissSource={FollowUnfollowSource.WHO_TO_FOLLOW_MODAL}
              /> */}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Suggested;
