"use client"
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorToast } from "../../lib";
import { ErrorMessage, useZodForm } from "../../components";
import { CreatePostInput, useCreatePostMutation } from "@social-zone/graphql";
import { object, string } from "zod";
import { useGlobalModalStateStore } from "../../store";

const newPostSchema = object({
  content: string()
    
});
export const usePost = ()=> {

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
    toast.promise(CreatePostAttempt({createPost:data }), {
      loading: 'Logging in...',
      success: ( {createPost:{message} }) => {
        queryClient.invalidateQueries();
        queryClient.invalidateQueries(['UserProfile'])
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
    postForm

  }
}