
import { ProfileInformation } from '@social-zone/graphql';
import { Modal, humanize } from '~ui';
import type { FC } from 'react';
import { useState } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';
import Followers from './Followers';
import Following from './Following';

interface FolloweringsProps {
  profile: ProfileInformation
}

const Followerings: FC<FolloweringsProps> = ({ profile }) => {
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  return (
    <div className="flex gap-8">
      <button
        type="button"
        className="text-left"
        onClick={() => {
          setShowFollowingModal(!showFollowingModal);
        }}
        data-testid="profile-followings"
      >
        <div className="text-xl">
          {humanize(profile?.followingCount as number)}
        </div>
        <div className="lt-text-gray-500">
         <span>{profile?.followingCount}</span>
        </div>
      </button>
      <button
        type="button"
        className="text-left"
        onClick={() => {
          setShowFollowersModal(!showFollowersModal);
          
        }}
        data-testid="profile-followers"
      >
        <div className="text-xl">
          {humanize(profile?.followersCount as number)}
        </div>
        <div className="lt-text-gray-500">
          <span>{profile?.followersCount}</span>
        </div>
      </button>
      <Modal
        title={`Following`}
        icon={<UsersIcon className="text-brand h-5 w-5" />}
        show={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
      >
        <Following profile={profile} />
      </Modal>
      <Modal
        title={`Followers`}
        icon={<UsersIcon className="text-brand h-5 w-5" />}
        show={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
      >
        <Followers profile={profile} />
      </Modal>
    </div>
  );
};

export default Followerings;
