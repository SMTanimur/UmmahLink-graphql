'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import CommentInput from './CommentInput';
import { useComment, useGetCommentsQuery } from '../../hooks/comment';

import { Spinner } from '../../components';
import CommentItem from './CommentItem';

dayjs.extend(relativeTime);

interface IProps {
  postID: string;
  authorID: string;
  commentInputRef: React.RefObject<HTMLInputElement>;
}

const Comments: React.FC<IProps> = (props) => {
  const {
    postID,

    commentInputRef,
  } = props;
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useGetCommentsQuery({
      option: { limit: 10, page: 1 },
      query: { postId: postID },
    });

  const CommentData =
    data?.pages.flatMap((page) => page.getComments?.docs) ?? [];
  const { attemptToCreateComment, createCommentLoading } = useComment();

  useEffect(() => {
    if (commentInputRef.current) commentInputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentBody(e.target.value);
  };

  const handleSubmitComment = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && commentBody) {
      try {
        setSubmitting(true);
       await attemptToCreateComment({ body: commentBody, _post_id: postID })
        setCommentBody('');
        setUpdateMode(false);
        setSubmitting(false);
      } catch (e: any) {
        setSubmitting(false);
        setError(e.error.message);
      }
    } else if (e.key === 'Escape') {
      if (isUpdateMode) handleCancelUpdate();
      if (commentInputRef.current) commentInputRef.current.blur();
    }
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: () => fetchNextPage(),
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  const handleCancelUpdate = () => {
    setCommentBody('');
    setUpdateMode(false);
  };


  return (
    <div className="rounded-b-md border-t border-gray-200 dark:border-gray-800 ">
      {/* ---- LOAD MORE COMMENTS BUTTON ----- */}
      {!error && (
        <span className="text-indigo-700 dark:text-indigo-400 text-sm font-bold cursor-pointer inline-block p-2">
          {createCommentLoading && (
            <div className="ml-8 py-2">
              <Spinner size="md" variant="primary" />{' '}
            </div>
          ) }
        </span>
      )}
      {/* ----- COMMENT LIST ---------- */}
      <div className="py-4 laptop:px-2 space-y-2 divide-y divide-gray-200 dark:divide-gray-800">
        {/* <CommentList comments={CommentData} /> */}

        {CommentData?.map(
          (comment: any, index) =>
            comment?.author && ( // avoid render comments with null author
              <CommentItem key={index} comment={comment} />
            )
        )}

        {hasNextPage ? (
          <div className="flex flex-col items-center justify-center ">
            <div ref={sentryRef}>
              <Spinner size="md" variant="primary" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-sm text-gray-400">There is no Comment to show</p>
          </div>
        )}
      </div>
      {/*  ---- INPUT COMMENT ----- */}
   <div className='fixed bottom-4 flex items-center justify-center py-4  w-[96.5%] z-[100] overflow-hidden bg-gray-200'>
    <div className='flex justify-center items-center w-[90%]'>
    <CommentInput
        ref={commentInputRef}
        onChange={handleCommentBodyChange}
        placeholder="Write a comment..."
        isSubmitting={isSubmitting}
        isLoading={createCommentLoading}
        isUpdateMode={isUpdateMode}
        onKeyDown={handleSubmitComment}
        value={commentBody}
      />
    </div>
   
   </div>
    
    </div>
  );
};

export default Comments;
