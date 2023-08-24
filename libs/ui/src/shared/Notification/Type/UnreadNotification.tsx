"use client"

import type { FC } from 'react';
import { memo } from 'react';

import {
  NotificationPaginate,
  useUpdateNotificationMutation,
} from '@social-zone/graphql';
import { UserPreview } from '../../UserPreview';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { NotificationProfileAvatar } from '../Profile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn, displayTime } from '../../../lib';
interface UnreadNotificationProps {
  notification: NotificationPaginate;
}

const UnreadNotification: FC<UnreadNotificationProps> = ({
  notification,
}) => {
  const router = useRouter();
  // const typeName =
  //   notification?.type?.toLowerCase() || '';

  const { mutateAsync } = useUpdateNotificationMutation();
  const handleNotificationClick = async (link: string, id: string) => {
    await mutateAsync({ input: { notifiId: id } });
    router.push(link);
  };
  return (
    <div
      className={cn(
        'flex items-start justify-between cursor-pointer border border-transparent dark:hover:border-indigo-700 p-4 hover:bg-gray-100 dark:hover:bg-indigo-1100 hover:opacity-95 divide-y divide-gray-100',
        notification.unread
          ? 'bg-indigo-100 dark:bg-indigo-950 hover:bg-indigo-200 '
          : 'bg-white dark:bg-indigo-900 dark:hover:bg-indigo-950'
      )}
      onClick={() =>
        handleNotificationClick(notification?.link, notification?.id)
      }
    >
      <div className="w-4/5 space-y-2">
        <Link href={notification.link}>
          <div className="flex items-center space-x-3">
            <UserPlusIcon className="h-6 w-6 text-green-500/70" />

            <UserPreview profile={notification?.initiator as any}>
              <NotificationProfileAvatar
                profile={notification?.initiator as any}
              />
            </UserPreview>
          </div>
        </Link>
        <div className="ml-9 relative">
          <div className="flex ">
          
            <div>
              <span className="text-brand-700 dark:text-brand-400 font-medium break-all">
                {notification?.initiator?.username}
              </span>
              &nbsp;
              <span className="text-gray-600 dark:text-gray-400 break-all text-sm md:text-lg">
                {notification.type === 'like'
                  ? 'likes your post.'
                  : notification.type === 'comment'
                  ? 'commented on your post.'
                  : notification.type === 'follow'
                  ? 'started following you.'
                  : notification.type === 'reply'
                  ? 'replied to your comment'
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[12px] text-gray-400">
        {displayTime(notification?.createdAt)}
      </div>
    </div>
  );
};

export default memo(UnreadNotification);
