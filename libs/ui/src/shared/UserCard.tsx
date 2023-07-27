/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';
import { GetLikeResponse, NewsFeedPaginate } from '@social-zone/graphql';

import type { FC } from 'react';
import { memo, useState } from 'react';
import { EmptyState, ErrorMessage, Loader } from '../components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useGetPostLikes } from '../hooks';
import UserInfo from './UserInfo';
import { UsersIcon } from '@heroicons/react/24/outline';

interface UserProfileProps {
  postItem: NewsFeedPaginate;
  isBig?: boolean;
}

const UserCard: FC<UserProfileProps> = ({ postItem, isBig = false }) => {
  const [offset, setOffset] = useState(0);
  const { likes, isLoading, isFetching, error } = useGetPostLikes(
    postItem.id as string,
    offset
  );

  const fetchLikes = async () => {
    setOffset(offset + 1);
  };


  if (likes?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span>
              <span>doesn’t have any Likes yet.</span>
            </span>
          </div>
        }
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }
  return (
    <div>
      <ErrorMessage
        className="m-5"
        title={`Failed to load Likes`}
        error={error as any}
      />
      {isLoading && likes?.length === 0 && (
        <div className="flex min-h-10rem min-w-15rem items-center justify-center py-8">
          <Loader message="likes loading..." />
        </div>
      )}

      {likes?.length !== 0 && (
        <PerfectScrollbar className="p-4 px-4 w-full laptop:w-30rem max-h-70vh overflow-y-scroll">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {likes?.map((user, index) => (
              <div key={index}>
                <UserInfo profile={user as GetLikeResponse} isBig={isBig} />
              </div>
            ))}
          </div>
          {!isLoading && likes?.length! >= 10 && !error && (
            <div className="flex items-center justify-center pt-2 border-t border-gray-100 dark:border-gray-800">
              <span
                className="text-indigo-700 dark:text-indigo-400 text-sm font-medium cursor-pointer"
                onClick={() => fetchLikes()}
              >
                Load more
              </span>
            </div>
          )}
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default memo(UserCard);
