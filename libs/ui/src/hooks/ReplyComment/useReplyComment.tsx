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
    async (data: CreateReplyInput) => {
      try {
        toast.promise(ReplyCommentAttempt({ input: data }), {
          loading: 'creating in...',
          success: ({ createCommentReply: { message } }) => {
            queryClient.invalidateQueries(['comments.infinite']);
            queryClient.invalidateQueries(['commentReplies.infinite']);
            return <b>{message}</b>;
          },
          error: (data) => {
            return (
              <ErrorMessage
                className="mb-3"
                title=" Reply failed!"
                error={{
                  name: ' Reply failed!',
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
