"use client"
import { NewsFeedPaginate } from '@social-zone/graphql';
import { create } from 'zustand';

interface GlobalModalState {

  loginModal: boolean;
  setLoginModal: (loginModal: boolean) => void;
  showProfileSwitchModal: boolean;
  setShowProfileSwitchModal: (showProfileSwitchModal: boolean) => void;
  showMobileDrawer: boolean;
  setShowMobileDrawer: (showMobileDrawer: boolean) => void;

  showNewPostModal: boolean;
  setShowNewPostModal: (showNewPostModal: boolean) => void;

  showPostEdit: boolean;
  updatePost: NewsFeedPaginate | null;
  setShowPostEdit: (
    showPostEdit: boolean,
    updatePost: NewsFeedPaginate | null
  ) => void;
}
export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  loginModal: false,
  setLoginModal: (loginModal) => set(() => ({ loginModal })),
  showProfileSwitchModal: false,
  setShowProfileSwitchModal: (showProfileSwitchModal) =>
    set(() => ({ showProfileSwitchModal })),
  showMobileDrawer: false,
  setShowMobileDrawer: (showMobileDrawer) => set(() => ({ showMobileDrawer })),

  showNewPostModal: false,
  setShowNewPostModal: (showNewPostModal) => set(() => ({ showNewPostModal })),

  showPostEdit: false,
  updatePost: null,
  forceEditPost: false,
  setShowPostEdit: (showPostEdit, updatePost) => 
    set(() => ({ showPostEdit, updatePost })),

  


}));
