"use client"
import { Dispatch, FC} from "react";
import { ProfileInformation, useMeQuery } from "@social-zone/graphql";
import { useGlobalModalStateStore } from "../store";
import { Button, Spinner } from "../components";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useFollowOrUnFollow } from "../hooks/follow";

interface FollowProps {
  profile: ProfileInformation
  setFollowing: Dispatch<boolean>;
  showText?: boolean;
  outline?: boolean;
}

export const Follow: FC<FollowProps> = ({
  profile,
  showText = true,
  setFollowing,
  outline = true
}) => {

  const setShowAuthModal = useGlobalModalStateStore(
    (state) => state.setLoginModal
  );
  const {FollowLoading,attemptToFollow} =useFollowOrUnFollow()
 
  const {data}=useMeQuery()
  const createFollow = async () => {
    if (!data?.me) {
      setShowAuthModal(true);
      return;
    }
    await  attemptToFollow(profile.id).then(()=>{
      setFollowing(true)
    })
  };

  return (
    <Button
      className="!px-3 !py-1.5 text-sm"
      outline={outline}
      onClick={createFollow}
      aria-label="Follow"
      disabled={FollowLoading}
      icon={
        FollowLoading ? <Spinner size="xs" /> : <UserPlusIcon className="h-4 w-4" />
      }
    >
    Follow
    </Button>
  );
};

