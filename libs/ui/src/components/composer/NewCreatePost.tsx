
import { Card } from '../Card';
import { cn } from '../../lib';
import { CardBody } from '../Card/CardBody';
import { Form } from '../form/Form';
import { TextArea } from '../input/TextArea';
import { Button } from '../button/Button';
import { usePost, useProfileQuery } from '../../hooks';
import { Spinner } from '../loading';
import { PencilIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { EmojiPicker } from '../../emoji';
import { RichTextEditorTipTap } from './rich-text-edior';

export const NewCreatePost = () => {
  const { attemptToCreatePost, createPostLoading, postForm ,imageFile,onFileChange,removeImage} = usePost();
  const {data}=useProfileQuery()
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
            {/* <TextArea
             
              placeholder={`what's on your mind, ${data?.me.username}?`}
              {...postForm.register('content')}
            /> */}
             <RichTextEditorTipTap value={postForm.watch('content')} onChange={(v: any) => postForm.setValue("content",v)} className='' id='rte' />
            {/* <div className="absolute bottom-14 right-2 flex space-x-3">
							<EmojiPicker onEmojiPick={handleEmojiPick} />
							
						</div> */}

             {/* --- UPLOAD OPTIONS */}
             <div className="flex items-center flex-grow">
              <input
                multiple
                type="file"
                hidden
                accept="image/*"
                onChange={onFileChange}
                readOnly={createPostLoading}
                id="photos"
              />
              <label
                className="inline-flex items-center cursor-pointer justify-start border-gray-200 text-gray-400 py-2 text-xs"
                htmlFor="photos"
              >
                <div
                  className="group flex items-center justify-center w-10 h-10 border-2 border-dashed border-gray-400 hover:border-indigo-700"
                  title="Upload photo"
                >
                  <PhotoIcon className="w-[24px] h-[20px] text-gray-400 hover:text-indigo-700" />
                </div>
              </label>
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

         {/*  ---- IMAGES PREVIEWS LIST ----- */}
         <div className="flex items-center space-x-2">
            {imageFile && imageFile.map((image) => (
              <div
                className="w-14 h-14 !bg-cover !bg-no-repeat relative"
                key={image.id}
                style={{
                  background: `#f7f7f7 url(${image.url})`
                }}
              >
                <XMarkIcon
                  className="p-2 w-[30px] h-[36px] absolute top-0 left-0 right-0 bottom-0 margin-auto  text-white hover:bg-red-600 cursor-pointer outline-none opacity-75 hover:opacity-100"
                  onClick={() => removeImage(image.id)}
                />
              </div>
            ))}
          </div>
      </CardBody>
    </Card>
  );
};
