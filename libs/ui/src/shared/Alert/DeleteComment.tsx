'use client';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useGlobalAlertStateStore } from '../../store/alerts';
import { Alert, ErrorMessage } from '../../components';
import { useDeleteCommentMutation } from '@social-zone/graphql';
import { useQueryClient } from '@tanstack/react-query';
export const DeleteComment: FC = () => {
  const showCommentDeleteAlert = useGlobalAlertStateStore(
    (state) => state.showCommentDeleteAlert
  );
  const queryClient = useQueryClient();
  const setShowCommentDeleteAlert = useGlobalAlertStateStore(
    (state) => state.setShowCommentDeleteAlert
  );
  const deletingComment = useGlobalAlertStateStore(
    (state) => state.deletingComment
  );
  const { mutateAsync, isLoading } = useDeleteCommentMutation();

  const handleComment = async () => {
    toast.promise(
      mutateAsync(
        { input: { commentId: deletingComment?.id as string } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['comments.infinite']);
            queryClient.invalidateQueries(['commentReplies.infinite']);
            setShowCommentDeleteAlert(false, null);
          },
        }
      ),
      {
        loading: 'Deleting...',
        success: ({ deleteComment: { message } }) => <b>{message}</b>,
        error: (data) => {
          return (
            <ErrorMessage
              className="mb-3"
              title="Delate Comment failed!"
              error={{
                name: 'Delate Comment failed!',
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
      title={`Delete Comment?`}
      description={``}
      confirmText={`Delete`}
      show={showCommentDeleteAlert}
      isDestructive
      isPerformingAction={isLoading}
      onConfirm={() => handleComment()}
      onClose={() => setShowCommentDeleteAlert(false, null)}
    />
  );
};
