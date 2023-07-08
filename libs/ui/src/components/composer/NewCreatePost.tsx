'use client';

import { Card } from '../Card';
import { cn } from '../../lib';
import { CardBody } from '../Card/CardBody';
import { Form } from '../form/Form';
import { TextArea } from '../input/TextArea';
import { Button } from '../button/Button';
import { usePost } from '../../hooks';
import { Spinner } from '../loading';
import { PencilIcon } from '@heroicons/react/24/outline';
import 'emoji-mart/css/emoji-mart.css';
import { EmojiPicker } from '../../emoji';

export const NewCreatePost = () => {
  const { attemptToCreatePost, createPostLoading, postForm } = usePost();

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
          onSubmit={async () => await attemptToCreatePost()}
        >
          {/* {error && (
            <ErrorMessage
              className="mb-3"
              title={t`Transaction failed!`}
              error={error}
            />
          )} */}

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
            disabled={createPostLoading}
            icon={
              createPostLoading ? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            <span>Save</span>
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
