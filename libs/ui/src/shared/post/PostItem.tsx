/* eslint-disable @nx/enforce-module-boundaries */

'use client';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import { NewsFeedPaginate } from '@social-zone/graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image, Modal } from 'libs/ui/src/components';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import ImageGrid from '../ImageGrid';
import LikeButton from '../LikeButton';
import UserCard from '../UserCard';
import { UserAvatarUrl } from '../../data';
import { stopEventPropagation } from '../../lib';

dayjs.extend(relativeTime);

interface IProps {
  post: NewsFeedPaginate;
  isAuth: boolean;
}

export const PostItem: React.FC<IProps> = (props) => {
  const { post, isAuth } = props;
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [isLikesModal, setIsLikesModal] = useState(false);

  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const handleToggleComment = () => {
    if (!isAuth) return;
    if (!isCommentVisible) setCommentVisible(true);
    if (commentInputRef.current) commentInputRef.current.focus();
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
              href={`/user/${post.author.username}`}
            >
              <h5 className="font-bold">{post.author.username}</h5>
            </Link>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">
                {dayjs(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
        </span>
        {/* {isAuth && (
          <PostOptions
            openDeleteModal={deleteModal.openModal}
            openUpdateModal={updateModal.openModal}
            post={post}
          />
        )} */}
      </div>
      {/* --- DESCRIPTION */}
      <div className="mb-3 mt-2">
        <p className="text-gray-700 dark:text-gray-300 break-words">
          {post.content}
        </p>
      </div>
      {/* --- IMAGE GRID ----- */}
      {post.photos?.length !== 0 && (
        <ImageGrid images={post.photos!.map((img) => img)} />
      )}
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
              onClick={handleToggleComment}
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
          <span
            className="py-2 rounded-md flex items-center justify-center text-gray-700 hover:text-gray-800 700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-brand-900 cursor-pointer hover:bg-brand-500 text-l w-2/4"
            onClick={handleToggleComment}
          >
            <CommandLineIcon className="h-4 w-4" />
            &nbsp;Comment
          </span>
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
      {/* {isAuth && (
        <Suspense fallback={<Lo className="text-gray-800 dark:text-white" />}>
          <Comments
            postID={post.id}
            authorID={post.author.id}
            isCommentVisible={isCommentVisible}
            commentInputRef={commentInputRef}
            setInputCommentVisible={setCommentVisible}
          />
        </Suspense>
      )} */}
    </div>
  );
};
