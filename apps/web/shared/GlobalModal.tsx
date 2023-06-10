'use client';

import type { FC } from 'react';
import { Modal, useGlobalModalStateStore } from '~ui';
import LoginView from '../app/global/login-form';

const GlobalModals: FC = () => {
  // Report modal state
  const showLoginModal = useGlobalModalStateStore((state) => state.loginModal);

  const setShowLoginModal = useGlobalModalStateStore(
    (state) => state.setLoginModal
  );

  return (
    <>
      <Modal
        title="Login"
        size="sm"
        // icon={<ArrowRightCircleIcon className="  h-5 w-5" />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        dataTestId="login-modal"
      >
        <LoginView />
      </Modal>
    </>
  );
};

export default GlobalModals;
