"use client"
import React, { useEffect, useState } from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../components';
import { usePostLikeOrUnlike } from '../../hooks';


interface IProps {
  postID: string;
  isLiked: boolean;
}

const LikeButton: React.FC<IProps> = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
const {LikeLoading,attemtToPostLikeOrUnlike}=usePostLikeOrUnlike()

  useEffect(() => {
    setIsLiked(props.isLiked);
  }, [props.isLiked]);

  const dispatchLike = async () => {
    if (LikeLoading) return;

    try {
      attemtToPostLikeOrUnlike(props.postID )
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <span
      className={` px-1 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 cursor-pointer text-l w-2/4  ${isLiked ? 'text-indigo-600 font-bold dark:text-indigo-400 dark:hover:bg-indigo-1000' : 'text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white  dark:bg-brand-900 hover:text-gray-800 dark:text-gray-400'} ${LikeLoading && 'opacity-50'}`}
      onClick={dispatchLike}
    >
      {LikeLoading ? <Spinner size='sm' variant='primary'/> : (
        <>
          <HandThumbUpIcon className='h-5 w-5' />
          &nbsp;
          {isLiked ? 'Unlike' : 'Like'}
        </>
      )}
    </span>
  );
};

export default LikeButton;
