'use client';

import React, { lazy } from 'react';

import CommentItem from './CommentItem';
import { CommentPaginate } from '@social-zone/graphql';

interface IProps {
  comments: CommentPaginate[];
}

const CommentList: React.FC<IProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment?.id}>
          <CommentItem comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
