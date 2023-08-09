
"use client"
import {
  AtSymbolIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Dispatch, FC } from 'react';
import { TabButton } from '../../components';
import { NotificationsType } from '../../types';


interface FeedTypeProps {
  setFeedType: Dispatch<string>;
  feedType: string;
}

export const FeedType: FC<FeedTypeProps> = ({ setFeedType, feedType }) => {
  const switchTab = (type: string) => {
    setFeedType(type);
   
  };

  return (
    <div className="flex items-center justify-between">
      <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 sm:mt-0 sm:px-0 md:pb-0">
        <TabButton
          name={`All notifications`}
          icon={<BellIcon className="h-4 w-4" />}
          active={feedType === NotificationsType.ALL}
          type={NotificationsType.ALL.toLowerCase()}
          onClick={() => switchTab(NotificationsType.ALL)}
        />
        <TabButton
          name={`Follow`}
          icon={<AtSymbolIcon className="h-4 w-4" />}
          active={feedType === NotificationsType.FOLLOW}
          type={NotificationsType.FOLLOW.toLowerCase()}
          onClick={() => switchTab(NotificationsType.FOLLOW)}
        />
        <TabButton
          name={`Comments`}
          icon={<ChatBubbleLeftRightIcon className="h-4 w-4" />}
          active={feedType === NotificationsType.COMMENT}
          type={NotificationsType.COMMENT.toLowerCase()}
          onClick={() => switchTab(NotificationsType.COMMENT)}
        />
        <TabButton
          name={`Likes`}
          icon={<HeartIcon className="h-4 w-4" />}
          active={feedType === NotificationsType.LIKE}
          type={NotificationsType.LIKE.toLowerCase()}
          onClick={() => switchTab(NotificationsType.LIKE)}
        />
      </div>
    </div>
  );
};

