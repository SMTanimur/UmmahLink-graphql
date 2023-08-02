"use client"
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorToast } from "../../lib";
import { ErrorMessage, useZodForm } from "../../components";
import { CreatePostInput, PhotosImageInput, useCreatePostMutation } from "@social-zone/graphql";
import { object, string } from "zod";
import { useGlobalModalStateStore } from "../../store";
import { useFileHandler } from "../../shared";
import { IImage } from "../../types";
import {uploadImages} from '@social-zone/client'

const newPostSchema = object({
  content: string()
    
});
export const usePost = ()=> {

  const { imageFile, onFileChange, clearFiles, removeImage } = useFileHandler<IImage[]>('multiple', []);

  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
  );
  const onError = (error: any) => {
 
    errorToast(error);
  };

const {mutateAsync:CreatePostAttempt,isLoading:createPostLoading}=useCreatePostMutation()
const queryClient = useQueryClient();

const postForm = useZodForm({
  schema:newPostSchema,

})

  const attemptToCreatePost = postForm.handleSubmit( async (data:CreatePostInput) => {
   try {
    const newPost = {
      ...data,
       content:data.content,
       photos: [] as PhotosImageInput[],
  };
  toast('Creating post...');

  if (imageFile.length !== 0) {
    const formData = new FormData();
    imageFile.forEach((image) => {
      if (image.file) formData.append('files', image.file);
    });
    const { data } = await uploadImages(formData);
    newPost.photos = data.images.map((i) => ({
      photosPublicId: i.img_id,
      photosUrl: i.img_src,
    }));
  }
    toast.promise(CreatePostAttempt({createPost:newPost} ), {
      loading: 'creating in...',
      success: ( {createPost:{message} }) => {
        toast.dismiss()
        queryClient.invalidateQueries();
        queryClient.invalidateQueries(['UserProfile'])
        clearFiles()
        setShowNewPostModal(false)
        
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
    });
   } catch (error) {
    onError(error);
   }
     
  })

  return {
    attemptToCreatePost,
    createPostLoading,
    postForm,
    imageFile,
    onFileChange,
    removeImage

  }
}