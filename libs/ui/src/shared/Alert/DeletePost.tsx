'use client';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useGlobalAlertStateStore } from '../../store/alerts';
import {  ErrorMessage } from '../../components';
import { useDeletePostMutation } from '@social-zone/graphql';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';


const Alert = dynamic(() => import('../../components/messages/Alert'), {
  ssr: false,
});
export const DeletePost: FC = () => {
  const showPostDeleteAlert = useGlobalAlertStateStore(
    (state) => state.showPostDeleteAlert
  );
  const queryClient = useQueryClient();
  const setShowPostDeleteAlert = useGlobalAlertStateStore(
    (state) => state.setShowPostDeleteAlert
  );
  const deletingPost = useGlobalAlertStateStore(
    (state) => state.deletingPost
  );
  const { mutateAsync, isLoading } = useDeletePostMutation();

  const handlePost = async () => {
    toast.promise(
      mutateAsync(
        { deletePostInput: { postId: deletingPost?.id as string} },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['Feeds']);
            queryClient.invalidateQueries(['Posts']);
            setShowPostDeleteAlert(false, null);
          },
        }
      ),
      {
        loading: 'Deleting...',
        success: ({ deletePost: { message } }) => <b>{message}</b>,
        error: (data) => {
          return (
            <ErrorMessage
              className="mb-3"
              title="Delate post failed!"
              error={{
                name: 'Delate post failed!',
                message: data.message,
              }}
            />
          );
        },
      }
    );
  };

  return (
    <Alert
      title={`Delete Post?`}
      description={`This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.`}
      confirmText={`Delete`}
      show={showPostDeleteAlert}
      isDestructive
      isPerformingAction={isLoading}
      onConfirm={()=> handlePost()}
      onClose={() => setShowPostDeleteAlert(false, null)}
    />
  );
};
