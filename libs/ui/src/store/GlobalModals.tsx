/* eslint-disable react/jsx-no-useless-fragment */



import { useGlobalModalStateStore } from './modal';
import { Modal } from '../components';
import { NewCreatePost } from '../components/composer/NewCreatePost';

export  const GlobalModals = () => {
 
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

