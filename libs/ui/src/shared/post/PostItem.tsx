
'use client';
import { NewsFeedPaginate } from '@social-zone/graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Link from 'next/link';
import React, {  Suspense, useState } from 'react';
import LikeButton from '../LikeButton';
import UserCard from '../UserCard';
import { UserAvatarUrl } from '../../data';
import { stopEventPropagation } from '../../lib';
import Attachments from './Attachments';
import { Image, Modal, Spinner } from '../../components';
import { CommentButton } from '../comments';
import { PostMenu } from '..';
import { useGlobalModalStateStore } from '../../store';
import Comments from '../comments/Comment';

dayjs.extend(relativeTime);

interface IProps {
  post: NewsFeedPaginate;
  isAuth: boolean;
}

export const PostItem: React.FC<IProps> = (props) => {
  const { post, isAuth } = props;
  const [isLikesModal, setIsLikesModal] = useState(false);
  const setShowPostModal = useGlobalModalStateStore(
    (state) => state.setShowPostCard
  );
  const handleToPostCardModal = () => {
    setShowPostModal(true,post)
  };

  const displayLikeMetric = (likesCount: number, isLiked: boolean) => {
    const like = likesCount > 1 ? 'like' : 'likes';
    const likeMinusSelf = likesCount - 1 > 1 ? 'like' : 'likes';
    const people = likesCount > 1 ? 'people' : 'person';
    const peopleMinusSelf = likesCount - 1 > 1 ? 'people' : 'person';

    if (isLiked && likesCount <= 1) {
      return 'You like this.';
    } else if (isLiked && likesCount > 1) {
      return `You and ${
        likesCount - 1
      } other ${peopleMinusSelf} ${likeMinusSelf} this.`;
    } else {
      return `${likesCount} ${people} ${like} this.`;
    }
  };

  const showAttachments = post?.photos!.length > 0

  return (
    <div className="flex flex-col tablet:rounded-lg my-4 p-4 first:mt-0 shadow-lg dark:bg-indigo-1000">
      {/* --- AVATAR AND OPTIONS */}
      <div className="flex justify-between items-center w-full">
      <span onClick={ stopEventPropagation} aria-hidden="true">
        <div className="flex gap-4 items-center">
          <Image
            src={
              post?.author?.avatar.avatarUrl
                ? post?.author?.avatar.avatarUrl
                : UserAvatarUrl
            }
            className="h-[50px] w-[50px] cursor-pointer rounded-full bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-[60px] sm:w-[60px]"
            height={60}
            width={60}
            alt={post?.author?.username}
            data-testid="profile-avatar"
          />
          <div className="flex flex-col ">
            <Link
              className="dark:text-indigo-400"
              href={`/user/${post?.author?.username}`}
            >
              <h5 className="font-bold">{post?.author?.username}</h5>
            </Link>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">
                {dayjs(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
        </span>
        <PostMenu Post={post}/>
      </div>
      {/* --- DESCRIPTION */}
      <div className="mb-3 mt-2">
        <p className="text-gray-700 dark:text-gray-300 break-words">
          {post.content}
        </p>
      </div>


      {/* --- IMAGE GRID ----- */}

      {showAttachments ? (
        <Attachments attachments={post?.photos} />
      ) : null}
      {/* ---- LIKES/COMMENTS DETAILS ---- */}
      <div className="flex justify-between px-2 my-2">
        <div onClick={() => setIsLikesModal(!isLikesModal)}>
          {post.likesCount! > 0 && (
            <span className="text-gray-500 text-sm cursor-pointer hover:underline hover:text-gray-800 dark:hover:text-white">
              {displayLikeMetric(post.likesCount!, post.isLiked!)}
            </span>
          )}
        </div>
        {/* --- COMMENTS COUNT ----- */}
        <div>
          {post!.commentsCount! > 0 && (
            <span
              className="text-gray-500 hover:text-gray-800 cursor-pointer text-sm hover:underline dark:text-gray-500 dark:hover:text-white"
              onClick={handleToPostCardModal}
            >
              {post.commentsCount}{' '}
              {post.commentsCount === 1 ? 'comment' : 'comments'}
            </span>
          )}
          <Modal
            title="Likes"
            show={isLikesModal}
            size="md"
            onClose={() => setIsLikesModal(false)}
          >
            <UserCard postItem={post as NewsFeedPaginate} />
          </Modal>
        </div>
      </div>
      {/* --- LIKE/COMMENT BUTTON */}
      {isAuth ? (
        <div className="flex items-center justify-around py-2 border-t border-gray-200 dark:border-indigo-950">
          <LikeButton postID={post.id!} isLiked={post.isLiked!} />
          <CommentButton commentCount={post.commentsCount!} onCommentToggle={handleToPostCardModal}/>
        </div>
      ) : (
        <div className="text-center py-2">
          <span className="text-gray-400 text-sm">
            <Link
              className="font-medium underline dark:text-indigo-400"
              href="/login"
            >
              Login
            </Link>{' '}
            to like or comment on post.
          </span>
        </div>
      )}
  
    </div>
  );
};
