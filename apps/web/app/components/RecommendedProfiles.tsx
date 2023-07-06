
"use client"
import { SparklesIcon, UsersIcon } from '@heroicons/react/24/outline';
import Suggested from './Suggested';
import { FC, useState } from 'react';
import { Pagination, useGetSuggestionPeopleQuery } from '@social-zone/graphql';
import { Card, EmptyState, ErrorMessage, Modal, UserProfileShimmer } from '~ui';
import UserProfile from '../(subpages)/user/[username]/components/UserProfile';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

const Title = () => {
  return (
    <div className="mb-2 flex items-center gap-2 px-5 sm:px-0">
      <SparklesIcon className="h-4 w-4 text-yellow-500" />
      <div>
        <span>Who to follow</span>
      </div>
    </div>
  );
};

const RecommendedProfiles: FC = () => {


  const {data,isLoading,error}=useGetSuggestionPeopleQuery({options:{limit:9},query:{}})
  console.log(data?.getSuggestionPeople)
  const [showSuggestedModal, setShowSuggestedModal] = useState(false);

  

  if (isLoading) {
    return (
      <>
        <Title />
        <Card className="space-y-4 p-5">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </Card>
      </>
    );
  }

  if (data?.getSuggestionPeople?.docs?.length === 0) {
    return (
      <>
        <Title />
        <EmptyState
          message={`No recommendations!`}
          icon={<UsersIcon className="text-brand h-8 w-8" />}
        />
      </>
    );
  }

  return (
    <>
      <Title />
      <Card as="aside">
        <div className="space-y-4 p-5">
          <ErrorMessage
            title={`Failed to load recommendations`}
            error={error as any}
          />
          {data?.getSuggestionPeople?.docs?.slice(0, 5)?.map((profile, index) => (
            <div
              key={profile?.id}
              className="flex items-center space-x-3 truncate"
            >
              <div className="w-full">
                <UserProfile
                  profile={profile as Pagination}
                  isFollowing={profile?.isFollowing}
                  followUnfollowPosition={index + 1}
                  // followUnfollowSource={FollowUnfollowSource.WHO_TO_FOLLOW}
                  showFollow
                />
              </div>
              {/* <DismissRecommendedProfile
                profile={profile as Profile}
                dismissPosition={index + 1}
                dismissSource={FollowUnfollowSource.WHO_TO_FOLLOW}
              /> */}
            </div>
          ))}
        </div>
        <button
          className="flex w-full items-center space-x-2 rounded-b-xl border-t bg-gray-50 px-5 py-3 text-left text-sm text-gray-600 hover:bg-gray-100 dark:border-t-gray-700 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900"
          type="button"
          onClick={() => {
            setShowSuggestedModal(true);
           
          }}
        >
          <EllipsisHorizontalIcon className="h-4 w-4" />
          <span>
            <span>Show more</span>
          </span>
        </button>
      </Card>
      <Modal
        title={`Suggested for you`}
        icon={<UsersIcon className="text-brand h-5 w-5" />}
        show={showSuggestedModal}
        onClose={() => setShowSuggestedModal(false)}
      >
        <Suggested />
      </Modal>
    </>
  );
};

export default RecommendedProfiles;
