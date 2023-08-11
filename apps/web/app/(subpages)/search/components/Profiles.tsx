"use client"
import { UsersIcon } from '@heroicons/react/24/outline';

import { motion } from 'framer-motion';
import type { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Card, EmptyState, ErrorMessage, UserProfilesShimmer, useSearchUserProfile } from '~ui';
import UserProfile from '../../user/[username]/components/UserProfile';


interface ProfilesProps {
  query: string | string[];
}

const Profiles: FC<ProfilesProps> = ({ query }) => {
  // Variables
  const { data, isLoading: searchUsersLoading,error } = useSearchUserProfile(
    query as string
  );



  if (searchUsersLoading) {
    return <UserProfilesShimmer isBig />;
  }

  if (data?.searchUser?.length === 0) {
    return (
      <EmptyState
        message={
          <span>
            No profiles for <b>&ldquo;{query}&rdquo;</b>
          </span>
        }
        icon={<UsersIcon className="text-brand h-8 w-8" />}
      />
    );
  }
  console.log(data?.searchUser,"console")

  if (error) {
    return <ErrorMessage title={`Failed to load profiles`} error={error as any} />;
  }

  return (
    <Virtuoso
      useWindowScroll
      className="[&>div>div]:space-y-3"
      data={data!.searchUser!}
      itemContent={(_, profile) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card key={profile?._id} className="p-5">
              <UserProfile profile={profile as any} showBio isBig />
            </Card>
          </motion.div>
        );
      }}
    />
  );
};

export default Profiles;
