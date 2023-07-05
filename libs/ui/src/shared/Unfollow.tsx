
import { ProfileInformation, useMeQuery } from "@social-zone/graphql";
import { Dispatch, FC } from "react";
import { toast } from "react-hot-toast";
import { errorToast } from "../lib";
import { Button, Spinner } from "../components";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { Errors } from "../types";
import { useFollowOrUnFollow } from "../hooks/follow";


interface UnfollowProps {
  profile: ProfileInformation
  setFollowing: Dispatch<boolean>;
  showText?: boolean;
}

export const Unfollow: FC<UnfollowProps> = ({
  profile,
  showText = false,
  setFollowing
}) => {
  const {data}=useMeQuery()
  

 

 
  const onError = (error: any) => {
    errorToast(error);
  };

   const {UnFollowLoading,attemptToUnFollow}=useFollowOrUnFollow()

  const createUnfollow = async () => {
    if (!data?.me) {
      return toast.error(Errors.Sign);
    }

    try {
     await attemptToUnFollow(profile.id).then(()=>{
      setFollowing(false)
     })
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Button
      className="!px-3 !py-1.5 text-sm"
      outline
      onClick={createUnfollow}
      disabled={UnFollowLoading}
      variant="danger"
      aria-label="Unfollow"
      icon={
        UnFollowLoading? (
          <Spinner variant="danger" size="xs" />
        ) : (
          <UserMinusIcon className="h-4 w-4" />
        )
      }
    >
      {showText && `Unfollow`}
    </Button>
  );
};

