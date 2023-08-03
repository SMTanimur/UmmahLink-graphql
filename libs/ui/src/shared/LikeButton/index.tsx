"use client"
import React, { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Spinner, Tooltip } from '../../components';
import { usePostLikeOrUnlike } from '../../hooks';
import { motion } from 'framer-motion';

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
  const iconClassName = isLiked
  ? 'w-[17px] sm:w-[20px] text-pink-500 t'
  : 'w-[15px] sm:w-[18px] text-brand-500 ';

  return (

    
     <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={dispatchLike}
        aria-label="Like"
      >
        <div className="rounded-full p-1.5 hover:bg-pink-300/20">
          <Tooltip
            placement="top"
            content={isLiked ? `Unlike` : `Like`}
            withDelay
          >
            {isLiked ? (
              <HeartIconSolid className={iconClassName} />
            ) : (
              <HeartIcon className={iconClassName} />
            )}
          </Tooltip>
        </div>
      </motion.button>

    
  );
};

export default LikeButton;
