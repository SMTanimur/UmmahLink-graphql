/* eslint-disable @typescript-eslint/no-non-null-assertion */

'use client';
import { NewsFeedPaginate } from '@social-zone/graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Link from 'next/link';
import React, { Suspense, useRef, useState } from 'react';
import LikeButton from '../LikeButton';
import UserCard from '../UserCard';
import { UserAvatarUrl } from '../../data';
import { stopEventPropagation } from '../../lib';
import Attachments from './Attachments';
import { Image, Modal, Spinner } from '../../components';
import { CommentButton } from '../comments';
import { PostMenu } from '..';
import { useGlobalModalStateStore } from '../../store';
import { useAuth } from '../../hooks';
import Comments from '../comments/Comment';

dayjs.extend(relativeTime);



export const PostCardModal: React.FC = () => {

  const postData = useGlobalModalStateStore(
    (state) => state.postData
  );
  const {isAuthenticated}=useAuth()
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [isLikesModal, setIsLikesModal] = useState(false);
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const handleToggleComment = () => {
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

 

  const showAttachments = postData!.photos!.length > 0

  return (
    <div className="flex flex-col md:rounded-lg my-4 p-4 first:mt-0 shadow-lg dark:bg-indigo-950 max-h-[80vh] overflow-y-auto ">
      {/* --- AVATAR AND OPTIONS */}
      <div className="flex justify-between items-center w-full">
      <span onClick={ stopEventPropagation} aria-hidden="true">
        <div className="flex gap-4 items-center">
          <Image
            src={
              postData?.author?.avatar?.avatarUrl
                ? postData?.author?.avatar?.avatarUrl
                : UserAvatarUrl
            }
            className="h-[50px] w-[50px] cursor-pointer rounded-full bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-[60px] sm:w-[60px]"
            height={60}
            width={60}
            alt={postData?.author?.username}
            data-testid="profile-avatar"
          />
          <div className="flex flex-col ">
            <Link
              className="dark:text-indigo-400"
              href={`/user/${postData?.author?.username}`}
            >
              <h5 className="font-bold">{postData?.author?.username}</h5>
            </Link>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">
                {dayjs(postData?.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
        </span>
        <PostMenu Post={postData!}/>
      </div>
      {/* --- DESCRIPTION */}
      <div className="mb-3 mt-2">
        <p className="text-gray-700 dark:text-gray-300 break-words">
          {postData?.content}
        </p>
      </div>


      {/* --- IMAGE GRID ----- */}

      {showAttachments ? (
        <Attachments attachments={postData?.photos} />
      ) : null}
      {/* ---- LIKES/COMMENTS DETAILS ---- */}
      <div className="flex justify-between px-2 my-2">
        <div onClick={() => setIsLikesModal(!isLikesModal)}>
          {postData!.likesCount! > 0 && (
            <span className="text-gray-500 text-sm cursor-pointer hover:underline hover:text-gray-800 dark:hover:text-white">
              {displayLikeMetric(postData!.likesCount!, postData!.isLiked!)}
            </span>
          )}
        </div>
        {/* --- COMMENTS COUNT ----- */}
        <div>
          {postData!.commentsCount! > 0 && (
            <span
              className="text-gray-500 hover:text-gray-800 cursor-pointer text-sm hover:underline dark:text-gray-500 dark:hover:text-white"
              onClick={handleToggleComment}
            >
              {postData?.commentsCount}{' '}
              {postData?.commentsCount === 1 ? 'comment' : 'comments'}
            </span>
          )}
          <Modal
            title="Likes"
            show={isLikesModal}
            size="md"
            onClose={() => setIsLikesModal(false)}
          >
            <UserCard postItem={postData as NewsFeedPaginate} />
          </Modal>
        </div>
      </div>
      {/* --- LIKE/COMMENT BUTTON */}
      {isAuthenticated ? (
        <div className="flex items-center justify-around py-2 border-t border-gray-200 dark:border-brand-900">
          <LikeButton postID={postData!.id!} isLiked={postData!.isLiked!} />
          <CommentButton commentCount={postData!.commentsCount!} onCommentToggle={handleToggleComment}/>
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
     {isAuthenticated && (
        <Suspense fallback={<Spinner size='sm' className="text-gray-800 dark:text-white" />}>
          <Comments
            postID={postData!.id!}
            authorID={postData!.author!.id!}
            commentInputRef={commentInputRef}
          />
        </Suspense>
      )}
    </div>
  );
};