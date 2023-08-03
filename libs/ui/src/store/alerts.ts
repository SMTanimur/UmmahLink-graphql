"use client"
import { NewsFeedPaginate } from '@social-zone/graphql';
import { create } from 'zustand';

interface GlobalAlertState {
  showPostDeleteAlert: boolean;
  deletingPost: NewsFeedPaginate | null;
  setShowPostDeleteAlert: (
    showPostDeleteAlert: boolean,
    deletingPost: NewsFeedPaginate | null
  ) => void;
  
}

export const useGlobalAlertStateStore = create<GlobalAlertState>((set) => ({
  showPostDeleteAlert: false,
  deletingPost: null,
  forceDeletePost: false,
  setShowPostDeleteAlert: (
    showPostDeleteAlert,
    deletingPost
  ) => set(() => ({ showPostDeleteAlert, deletingPost })),
  
}));
