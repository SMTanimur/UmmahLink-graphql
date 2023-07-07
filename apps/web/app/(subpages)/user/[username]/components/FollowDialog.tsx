"use client"

import { ProfileInformation } from "@social-zone/graphql";
import { Dispatch, FC } from "react";
import { Button, Follow, Image, Slug } from "~ui";

interface FollowModalProps {
  profile: ProfileInformation
  setShowFollowModal: Dispatch<boolean>;
  setFollowing: Dispatch<boolean | null>;
}

const FollowModal: FC<FollowModalProps> = ({
  profile,
  setFollowing,
  setShowFollowModal
}) => {

  return (
    <div className="p-5">
      <div className="flex justify-between text-lg font-bold">
        <span className="flex">
          <Image
            src={profile.avatar as string}
            className="mr-2 h-10 w-10 rounded-full border bg-gray-200 dark:border-gray-700"
            alt={profile.name}
          />
          <Slug
            className="flex items-center"
            slug={profile.username}
            prefix="@"
          />{' '}
        </span>
        <span className="flex">
        
            <div className="flex space-x-2">
              <Follow
                profile={profile}
                setFollowing={setFollowing}
                showText
                outline={false}
              />
            </div>
        
          <Button
            className="ml-3 !px-3 !py-1.5 text-sm"
            outline
            onClick={() => {
              setShowFollowModal(false);
            }}
            aria-label={`Not now`}
          >
            <span>Not now</span>
          </Button>
        </span>
      </div>
    </div>
  );
};

export default FollowModal;
