'use client';
import { CommentPaginate, NewsFeedPaginate } from '@social-zone/graphql';
import { create } from 'zustand';

interface GlobalAlertState {
  showPostDeleteAlert: boolean;
  deletingPost: NewsFeedPaginate | null;
  setShowPostDeleteAlert: (
    showPostDeleteAlert: boolean,
    deletingPost: NewsFeedPaginate | null
  ) => void;

  showCommentDeleteAlert: boolean;
  deletingComment: CommentPaginate | null;
  setShowCommentDeleteAlert: (
    showCommentDeleteAlert: boolean,
    deletingComment: CommentPaginate | null
  ) => void;
 
}

export const useGlobalAlertStateStore = create<GlobalAlertState>((set) => ({
  showPostDeleteAlert: false,
  deletingPost: null,
  forceDeletePost: false,
  setShowPostDeleteAlert: (showPostDeleteAlert, deletingPost) =>
    set(() => ({ showPostDeleteAlert, deletingPost })),

  showCommentDeleteAlert: false,
  deletingComment: null,
  forceDeleteComment: false,
  setShowCommentDeleteAlert: (showCommentDeleteAlert, deletingComment) =>
    set(() => ({ showCommentDeleteAlert, deletingComment })),
}));
