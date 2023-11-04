

import { Card } from '../Card';
import { cn, errorToast } from '../../lib';
import { CardBody } from '../Card/CardBody';
import { Form, useZodForm } from '../form/Form';
import { TextArea } from '../input/TextArea';
import { Button } from '../button/Button';
import { Spinner } from '../loading';
import { PencilIcon } from '@heroicons/react/24/outline';
import { EmojiPicker } from '../../emoji';
import { object, string } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  useUpdatePostMutation,
} from '@social-zone/graphql';
import { FC } from 'react';
import { ErrorMessage } from '../messages/ErrorMessage';
import { useGlobalModalStateStore } from '../../store';
const editPostSchema = object({
  content: string(),
});

export const EditPost: FC = () => {
  const onError = (error: any) => {
    errorToast(error);
  };
  const setShowEditPostModal = useGlobalModalStateStore(
    (state) => state.setShowPostEdit
  );
  const postInfo = useGlobalModalStateStore(
    (state) => state.updatePost
  );
  const { mutateAsync: UpdatePostAttempt, isLoading: updatePostLoading } =
    useUpdatePostMutation();
  const queryClient = useQueryClient();

  const postForm = useZodForm({
    schema: editPostSchema,
    defaultValues: {
    content: postInfo?.content ?? '',
    }
  });
  const attemptToUpdatePost = postForm.handleSubmit(async (data: any) => {
    try {
      const updatePost = {
        postId: postInfo?.id as string,
        content: data.content,
      };

      toast.promise(UpdatePostAttempt({ updatePost: updatePost }), {
        loading: 'creating in...',
        success: ({ updatePost: { message } }) => {
          toast.dismiss();
          setShowEditPostModal(false, null);
          queryClient.invalidateQueries(['Feeds']);
          queryClient.invalidateQueries(['Posts']);
          queryClient.invalidateQueries(['UserProfile']);

          return <b>{message}</b>;
        },
        error: (data) => {
          return (
            <ErrorMessage
              className="mb-3"
              title=" Update Post failed!"
              error={{
                name: ' Update Post failed!',
                message: data.message,
              }}
            />
          );
        },
      });
    } catch (error) {
      onError(error);
    }
  });

  function handleEmojiPick(emote: any) {
    //The types provided by these types are incorrect. I promise there's a native obj here

    postForm.setValue('content', postForm.watch('content') + emote?.native);
  }
  return (
    <Card
      className={cn(
        { '!rounded-b-xl !rounded-t-none border-none': '' },
        'pb-3'
      )}
    >
      <CardBody>
        <Form
          form={postForm}
          className="space-y-4"
          onSubmit={async () => await attemptToUpdatePost()}
        >
          <div className="relative">
            <TextArea
              label={`Bio`}
              placeholder={`Tell us something about you!`}
              {...postForm.register('content')}
            />
            <div className="absolute top-5 right-2 flex space-x-3">
              <EmojiPicker onEmojiPick={handleEmojiPick} />
            </div>
          </div>

          <Button
            className="ml-auto"
            type="submit"
            disabled={updatePostLoading}
            icon={
              updatePostLoading ? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            <span>Update</span>
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
