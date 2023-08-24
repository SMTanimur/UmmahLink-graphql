'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { FeedType, List, Settings, useProfileQuery } from '~ui';

type NotificationsProps = {
  type: string;
};

 const Notification: FC<NotificationsProps> = ({ type }) => {
  const { data: user } = useProfileQuery();
  const currentProfile = user?.me;
  const [feedType, setFeedType] = useState(
    type &&
      ['all', 'follow', 'comment', 'likes', 'unread'].includes(type as string)
      ? type.toString().toUpperCase()
      : 'ALL'
  );

  // if (!currentProfile) {
  //   return <Custom404 />;
  // }

  return (
    <div className="flex grow justify-center px-0 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-3">
        <div className="flex flex-wrap justify-between gap-3 pb-2">
          <FeedType setFeedType={setFeedType} feedType={feedType} />
          <Settings />
        </div>
        <List feedType={feedType} />
      </div>
    </div>
  );
};

export default Notification
