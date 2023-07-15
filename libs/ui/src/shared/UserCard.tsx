'use client';
import { GetLikeResponse, NewsFeedPaginate } from '@social-zone/graphql';

import type { FC } from 'react';
import { memo, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Loader } from '../components';

import { useGetPostLikes } from '../hooks';
import UserInfo from './UserInfo';

interface UserProfileProps {
  postItem: NewsFeedPaginate
  isBig?: boolean;
  
}

const UserCard: FC<UserProfileProps> = ({
  postItem,
  isBig = false,
}) => {
  const [offset, setOffset] = useState(0);
  const { likes, isLoading, isFetching, error } = useGetPostLikes(
    postItem.id as string,
    offset
  );

  const fetchLikes = async () => {
    setOffset(offset + 1);
  };

  return (
    <div>
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
                <UserInfo profile={user as GetLikeResponse} isBig={isBig}/>
              </div>
            ))}
          </div>
          {!isLoading && likes!.length >= 10 && !error && (
            <div className="flex items-center justify-center pt-2 border-t border-gray-100 dark:border-gray-800">
              <span
                className="text-indigo-700 dark:text-indigo-400 text-sm font-medium cursor-pointer"
                onClick={() => fetchLikes()}
              >
                Load more
              </span>
            </div>
          )}
          {isLoading && !error && (
            <div className="flex w-full items-center justify-center py-8">
              <Loader />
            </div>
          )}
          {error! && (
            <div className="flex items-center justify-center py-8">
              <span className="text-gray-400 text-sm">No more likes.</span>
            </div>
          )}
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default memo(UserCard);
