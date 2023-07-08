"use client"
import { AdjustmentsHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { NewsFeedPaginate } from '@social-zone/graphql';
import React, { useEffect, useRef, useState } from 'react';


interface IProps {
  openDeleteModal: () => void;
  openUpdateModal: () => void;
  post: NewsFeedPaginate
}

export const PostOptions: React.FC<IProps> = (props) => {
  const [isOpenOption, setIsOpenOption] = useState(false);
  const isOpenOptionRef = useRef(isOpenOption);


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isOpenOptionRef.current = isOpenOption;
  }, [isOpenOption]);

  const handleClickOutside = (e: Event) => {
    const option = (e.target as HTMLDivElement).closest(`#post_${props.post.id}`);

    if (!option && isOpenOptionRef.current) {
      setIsOpenOption(false);
    }
  }

  const handleClickDelete = () => {
  console.log('sdjf')
  }

  const handleClickEdit = () => {
  console.log('div')
  }

  return (
    <div className="relative z-10" id={`post_${props.post.id}`}>
      <div
        className="post-option-toggle p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
        onClick={() => setIsOpenOption(!isOpenOption)}
      >
        <AdjustmentsHorizontalIcon className="text-lg" />
      </div>
      {isOpenOption && (
        <div className="w-60 flex flex-col bg-white dark:bg-indigo-950 rounded-md shadow-lg overflow-hidden absolute top-8 right-3 border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          {props.post.isOwnPost && (
            <>
              <h4
                className="p-4 flex items-center hover:bg-indigo-700 hover:text-white cursor-pointer dark:text-white"
                onClick={handleClickEdit}
              >
                <PencilSquareIcon className="mr-4 h-4 w-4" />
                Edit Post
              </h4>
              <h4
                className="p-4 flex items-center hover:bg-indigo-700 hover:text-white cursor-pointer dark:text-white"
                onClick={handleClickDelete}
              >
                <TrashIcon className="mr-4 h-4 w-4" />
                Delete Post
              </h4>
            </>
          ) }
        </div>
      )}
    </div>
  );
};

