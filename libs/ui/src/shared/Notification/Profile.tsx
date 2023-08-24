
import { ProfileInformation } from '@social-zone/graphql';

import Link from 'next/link';
import type { FC } from 'react';
import { Image } from '../../components';
import { sanitizeDisplayName } from '../../lib';

interface NotificationProfileProps {
  profile: ProfileInformation;
}

export const NotificationProfileAvatar: FC<NotificationProfileProps> = ({
  profile
}) => {
  return (
    <div>
      <Image
        src={profile?.avatar?.avatarUrl as string}
        className="h-8 w-8 rounded-full border bg-gray-200 dark:border-gray-700"
        height={32}
        width={32}
        alt={profile?.username}
      />
    </div>
  );
};

export const NotificationProfileName: FC<NotificationProfileProps> = ({
  profile
}) => {
  return (
    <Link
      href={`/user/${profile?.username}`}
      className="inline-flex items-center space-x-1 font-bold"
    >
      <div>
        {sanitizeDisplayName(profile?.name) ?? profile?.username }
      </div>
     
    </Link>
  );
};
