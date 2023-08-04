"use client"
import { EditPost, Modal, NewCreatePost } from "../components";
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
  const setShowEditPostModal = useGlobalModalStateStore(
    (state) => state.setShowPostEdit
  );
  const showEditPostModal = useGlobalModalStateStore(
    (state) => state.showPostEdit
  );
  const PostModal = useGlobalModalStateStore(
    (state) => state.updatePost
  );

  console.log(PostModal,'PostModal')

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
      <Modal
        title={`Edit post`}
        size="md"
        show={showEditPostModal}
        onClose={() => setShowEditPostModal(false,null)}
      >
        <EditPost />
      </Modal>
    </>
  );
};
