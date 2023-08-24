"use client"
import { BellIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import NotificationShimmer from './Shimmer';
import CommentNotification from './Type/CommentNotification';
import FollowerNotification from './Type/FollowerNotification';
import LikeNotification from './Type/LikeNotification';
import { NotificationsType } from '../../types';
import { NotificationPaginate, NotificationType } from '@social-zone/graphql';
import { useGetNotificationsQuery, useProfileQuery } from '../../hooks';
import { Card, EmptyState, ErrorMessage } from '../../components';
import UnreadNotification from './Type/UnreadNotification';

interface ListProps {
  feedType: string;
}

const List: FC<ListProps> = ({ feedType }) => {
  const {data:user}=useProfileQuery()
  const currentProfile=user?.me

  const getNotificationType = () => {
    switch (feedType) {
      case NotificationsType.ALL:
        return;
      case NotificationsType.FOLLOW :
        return NotificationType.Follow
       
      case NotificationsType.COMMENT:
        return NotificationType.Comment
        
      case NotificationsType.LIKE:
        return NotificationType.Like
      
      default:
        return;
    }
  };

  const  isUnread = feedType === 'UNREAD'
  

  const {data,isLoading,hasNextPage,fetchNextPage,isError,error}=useGetNotificationsQuery({
    options:{limit:20},
    query:{
      type:getNotificationType(),
       unread: isUnread ? true : null

    }
  })

  const notifications = data?.pages.flatMap((page) => page.getNotifications?.docs) ?? [];


  const hasMore = hasNextPage

  

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }
   await fetchNextPage()
  };

  if (isLoading) {
    return (
      <Card className="divide-y dark:divide-gray-700">
        <NotificationShimmer />
        <NotificationShimmer />
        <NotificationShimmer />
        <NotificationShimmer />
      </Card>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        className="m-3"
        title={`Failed to load notifications`}
        error={error as any}
      />
    );
  }

  if (notifications?.length === 0) {
    return (
      <EmptyState
        message={`Inbox zero!`}
        icon={<BellIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <Card>
      <Virtuoso
        useWindowScroll
        className="virtual-notification-list"
        data={notifications}
        endReached={onEndReached}
        itemContent={(_, notification) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {notification?.type === 'follow' && (
                <FollowerNotification
                  notification={notification as NotificationPaginate}
                />
              )}
             
              {notification?.type === 'like' && (
                <LikeNotification
                  notification={notification as NotificationPaginate}
                />
              )}
              {notification?.type === 'comment' && (
                <CommentNotification
                  notification={notification as NotificationPaginate}
                />
              )}
              { isUnread    && (
                <UnreadNotification
                  notification={notification as NotificationPaginate}
                />
              )}
             
            </motion.div>
          );
        }}
      />
    </Card>
  );
};

export default List;
