'use client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { errorToast } from '../../lib';
import { ErrorMessage, useZodForm } from '../../components';
import {
  CreateReplyInput,
  useReplyCommentMutation,
} from '@social-zone/graphql';
import { object, string } from 'zod';

const newReplySchema = object({
  body: string(),
});

export const useReplyComment = () => {
  const onError = (error: any) => {
    errorToast(error);
  };

  const { mutateAsync: ReplyCommentAttempt, isLoading: ReplyCommentLoading } =
    useReplyCommentMutation();

  const queryClient = useQueryClient();

  const replyCommentForm = useZodForm({
    schema: newReplySchema,
  });

  const attemptToReplyComment = replyCommentForm.handleSubmit(
    async (data: any) => {
      try {
        toast.promise(ReplyCommentAttempt({ input: data }), {
          loading: 'creating in...',
          success: ({ createCommentReply: { message } }) => {
            toast.dismiss();
            queryClient.invalidateQueries();
            queryClient.invalidateQueries(['UserProfile']);
            return <b>{message}</b>;
          },
          error: (data: any) => {
            return (
              <ErrorMessage
                className="mb-3"
                title=" Follow failed!"
                error={{
                  name: ' Follow failed!',
                  message: data.message,
                }}
              />
            );
          },
        });
      } catch (error) {
        onError(error);
      }
    }
  );

  return {
    ReplyCommentLoading,
    attemptToReplyComment,
    replyCommentForm,
  };
};
