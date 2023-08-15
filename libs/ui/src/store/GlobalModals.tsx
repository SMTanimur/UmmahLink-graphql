"use client"
import { useMeQuery } from '@social-zone/graphql';
import { EditPost, Modal, NewCreatePost } from '../components';

import { PostCardModal } from '../shared/post/PostModalCard';
import { useGlobalModalStateStore } from './modal';
export const GlobalModals = () => {
  const { data } = useMeQuery();

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
  const setShowPostModal = useGlobalModalStateStore(
    (state) => state.setShowPostCard
  );
  const showPostModal = useGlobalModalStateStore((state) => state.showPostCard);
  const postData = useGlobalModalStateStore((state) => state.postData);

  return  data?.me && (

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
          onClose={() => setShowEditPostModal(false, null)}
        >
          <EditPost />
        </Modal>
        <Modal
          title={`${postData?.author?.username} post`}
          size="lg"
          show={showPostModal}
          onClose={() => setShowPostModal(false, null)}
        >
          <PostCardModal />
        </Modal>
      </>
 
  );
};
