"use client"
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useProfileQuery } from '../../hooks';
import { useNotificationPersistStore } from '../../store';
import { useGetNotificationCountQuery } from '@social-zone/graphql';


 export const NotificationIcon: FC = () => {
 const {data:user}=useProfileQuery()
 const currentProfile=user?.me
  const getNotificationCount = useNotificationPersistStore(
    (state) => state.getNotificationCount
  );
  const setNotificationCount = useNotificationPersistStore(
    (state) => state.setNotificationCount
  );
  const [unreadNotificationCount, setUnreadNotificationCount] =
    useState<number>(0);

  const {data,isLoading}=useGetNotificationCountQuery({
    query:{}
  })

  useEffect(() => {
    if (!currentProfile || isLoading) {
      return;
    }

    const currentTotalCount = data?.getNotificationCount.count || 0;
    const readNotificationCount = getNotificationCount(currentProfile?._id);

    if (readNotificationCount) {
      setUnreadNotificationCount(currentTotalCount - readNotificationCount);
    } else {
      setNotificationCount(currentProfile?._id, currentTotalCount);
      setUnreadNotificationCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return (
    <Link
      href="/notifications"
      className="hidden min-w-[40px] items-start justify-center rounded-md p-1 hover:bg-gray-300/20 md:flex"
      onClick={() => {
        setNotificationCount(
          currentProfile!._id!,
          data?.getNotificationCount?.count || 0
        );
        setUnreadNotificationCount(0);
      }}
    >
      <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      {unreadNotificationCount > 0 && (
        <span className="h-2 w-2 rounded-full bg-red-500" />
      )}
    </Link>
  );
};

