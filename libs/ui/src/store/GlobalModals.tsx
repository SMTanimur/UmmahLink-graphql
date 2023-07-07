/* eslint-disable react/jsx-no-useless-fragment */
"use client"


import { useGlobalModalStateStore } from './modal';
import { FC } from 'react';
import { Modal } from '../components';
import { NewCreatePost } from '../components/composer/NewCreatePost';




export  const GlobalModals: FC = () => {
 
  // const showProfileSwitchModal = useGlobalModalStateStore(
  //   (state) => state.showProfileSwitchModal
  // );
  // const setShowProfileSwitchModal = useGlobalModalStateStore(
  //   (state) => state.setShowProfileSwitchModal
  // );
  const showNewPostModal = useGlobalModalStateStore(
    (state) => state.showNewPostModal
  );
  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
  );
 

  return (
    <>
     
     
      <Modal
        title={`Create post`}
        size="md"
        show={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
      >
        <NewCreatePost />
      </Modal>
    </>
  );
};

