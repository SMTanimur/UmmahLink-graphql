
"use client"
import { Modal, NewCreatePost } from "../components";
import { useGlobalModalStateStore } from "./modal";


export const GlobalModals = () => {
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
