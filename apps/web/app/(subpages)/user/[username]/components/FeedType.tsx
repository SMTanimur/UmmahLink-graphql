import {
  ChatBubbleLeftRightIcon,

  PencilSquareIcon,

  UserIcon
} from '@heroicons/react/24/outline';

import type { Dispatch, FC } from 'react';
import { ProfilePostType, TabButton } from '~ui';


interface FeedTypeProps {
  setFeedType: Dispatch<string>;
  feedType: string;
}

const FeedType: FC<FeedTypeProps> = ({ setFeedType, feedType }) => {
  const switchTab = (type: string) => {
    setFeedType(type);

  };

  return (
    <div className="flex items-center justify-between">
      <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 sm:mt-0 sm:px-0 md:pb-0">
        <TabButton
          name={`Feed`}
          icon={<PencilSquareIcon className="h-4 w-4" />}
          active={feedType === ProfilePostType.Post}
          type={ProfilePostType.Post.toLowerCase()}
          onClick={() => switchTab(ProfilePostType.Post)}
        />
        <TabButton
          name={`Following`}
          icon={<UserIcon className="h-4 w-4" />}
          active={feedType === ProfilePostType.Following}
          type={ProfilePostType.Following.toLowerCase()}
          onClick={() => switchTab(ProfilePostType.Following)}
        />
        <TabButton
          name={`Followers`}
          icon={<UserIcon className="h-4 w-4" />}
          active={feedType === ProfilePostType.Followers}
          type={ProfilePostType.Followers.toLowerCase()}
          onClick={() => switchTab(ProfilePostType.Followers)}
        />
      </div>
    </div>
  );
};

export default FeedType;
