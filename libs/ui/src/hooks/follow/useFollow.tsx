'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useFollowUserMutation,
  useMeQuery,
  useUnFollowUserMutation,
} from '@social-zone/graphql';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { errorToast } from '../../lib';
import { ErrorMessage } from '../../components';

export const useFollowOrUnFollow = () => {
  const onError = (error: any) => {
    errorToast(error);
  };

  const { mutateAsync: FollowUserMutate, isLoading: FollowLoading } =
    useFollowUserMutation();
  const { mutateAsync: UnFollowUserMutate, isLoading: UnFollowLoading } =
    useUnFollowUserMutation({});
  const queryClient = useQueryClient();

  const attemptToFollow = async (FollowId: string) => {
    try {
      toast.promise(
        FollowUserMutate({ followOrUnFollowInput: { follow_ID: FollowId } }),
        {
          loading: 'Logging in...',
          success: ({ followUser: { message } }) => {
            queryClient.invalidateQueries(['GetPostLikes']);
            queryClient.invalidateQueries(['GetSuggestionPeople']);
            queryClient.invalidateQueries(['Posts']);
            queryClient.invalidateQueries(['followers.infinite']);
            queryClient.invalidateQueries(['UserProfile']);
            queryClient.invalidateQueries(['following.infinite']);
            return <b>{message}</b>;
          },
          error: (data) => {
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
        }
      );
    } catch (error) {
      onError(error);
    }
  };

  const attemptToUnFollow = async (FollowId: string) => {
    try {
      toast.promise(
        UnFollowUserMutate({ followOrUnFollowInput: { follow_ID: FollowId } }),
        {
          loading: 'Logging in...',
          success: ({ unFollowUser: { message } }) => {
            queryClient.invalidateQueries(useMeQuery.getKey());
            queryClient.invalidateQueries(['GetSuggestionPeople']);
            queryClient.invalidateQueries(['Posts']);
            queryClient.invalidateQueries(['followers.infinite']);
            queryClient.invalidateQueries(['following.infinite']);
            queryClient.invalidateQueries(['UserProfile']);
            return <b>{message}</b>;
          },
          error: (data) => {
            return (
              <ErrorMessage
                className="mb-3"
                title=" unFollow failed!"
                error={{
                  name: ' unFollow failed!',
                  message: data.message,
                }}
              />
            );
          },
        }
      );
    } catch (error) {
      onError(error);
    }
  };

  return {
    attemptToFollow,
    attemptToUnFollow,
    FollowLoading,
    UnFollowLoading,
  };
};
