import { UsersIcon } from "@heroicons/react/24/outline";
import { ProfileInformation, useGetFollowersQuery } from "@social-zone/graphql";
import { Virtuoso } from 'react-virtuoso';
import { FC, useState } from "react";
import { EmptyState, ErrorMessage } from "~ui";


interface FollowersProps {
  profile: ProfileInformation
}

const Followers: FC<FollowersProps> = ({ profile }) => {
  const [hasMore, setHasMore] = useState(true);
 

  // Variables
 
  const { data, error } = useGetFollowersQuery({
    options: { limit: 15 },
    query: { target: profile.id },
  });

  const followers = data?.getFollowers
  const pageInfo = data?.getFollowers

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }

   
  };

 

  if (followers?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{profile.username}
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
        data={followers}
        endReached={onEndReached}
        itemContent={(index: any, following:any) => {
          return (
            <div className="p-5">
             
              
              
            </div>
          );
        }}
      />
    </div>
  );
};

export default Followers;
