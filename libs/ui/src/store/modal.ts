
import { create } from 'zustand';

interface GlobalModalState {

  loginModal: boolean;
  setLoginModal: (loginModal: boolean) => void;
  showProfileSwitchModal: boolean;
  setShowProfileSwitchModal: (showProfileSwitchModal: boolean) => void;
  showMobileDrawer: boolean;
  setShowMobileDrawer: (showMobileDrawer: boolean) => void;
}

export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  loginModal: false,
  setLoginModal: (loginModal) => set(() => ({ loginModal })),
  showProfileSwitchModal: false,
  setShowProfileSwitchModal: (showProfileSwitchModal) =>
    set(() => ({ showProfileSwitchModal })),
  showMobileDrawer: false,
  setShowMobileDrawer: (showMobileDrawer) => set(() => ({ showMobileDrawer }))
}));
