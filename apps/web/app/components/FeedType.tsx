"use client"
import {
  PencilSquareIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Dispatch, FC } from 'react';
import { TabButton } from '~ui';


export enum Type {
  FEED = 'Post',
  FOLLOWING = 'FOLLOWING',
  INFO = 'INFO',
  FOLLOWERS = 'FOLLOWERS'
}

interface FeedTypeProps {
  setFeedType: Dispatch<Type>;
  feedType: Type;
}

const FeedType: FC<FeedTypeProps> = ({ setFeedType, feedType }) => {
  return (
    <div className="flex flex-wrap items-center justify-between px-1 md:px-0">
      <div className="flex gap-3 overflow-x-auto sm:px-0">
      <TabButton
          name={`Feed`}
          icon={<PencilSquareIcon className="h-4 w-4" />}
          active={feedType === Type.FEED}
          showOnSm={false}
          onClick={() => {
            setFeedType(Type.FEED);
            
          }}
        />
        <TabButton
          name={`Following`}
          icon={<UserIcon className="h-4 w-4" />}
          active={feedType === Type.FOLLOWING}
          showOnSm={false}
          onClick={() => {
            setFeedType(Type.FOLLOWING);
            
          }}
        />
        <TabButton
          name={`Followers`}
          icon={<UserIcon className="h-4 w-4" />}
          active={feedType === Type.FOLLOWERS}
          showOnSm={false}
          onClick={() => {
            setFeedType(Type.FOLLOWERS);
           
          }}
        />
      </div>

    </div>
  );
};

export default FeedType;
