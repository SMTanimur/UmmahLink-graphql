"use client"
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorToast } from "../../lib";
import { ErrorMessage, useZodForm } from "../../components";
import { CreateCommentInput, DeleteCommentInput, UpdateCommentInput, useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "@social-zone/graphql";
import { object, string } from "zod";

const newCommentSchema = object({
  body: string()
    
});
export const useComment = ()=> {



  const onError = (error: any) => {
 
    errorToast(error);
  };

const {mutateAsync:CreateCommentAttempt,isLoading:createCommentLoading}=useCreateCommentMutation()
const {mutateAsync:UpdateCommentAttempt,isLoading:updateCommentLoading}=useUpdateCommentMutation()
const {mutateAsync:DeleteCommentAttempt,isLoading:deleteCommentLoading}=useDeleteCommentMutation()
const queryClient = useQueryClient();

const commentForm = useZodForm({
  schema:newCommentSchema,

})

  const attemptToCreateComment = commentForm.handleSubmit( async (data:CreateCommentInput) => {
   try {
   
  

    toast.promise(CreateCommentAttempt({input:data} ), {
      loading: 'creating in...',
      success: ( {createComment:{message} }) => {
        toast.dismiss()
        queryClient.invalidateQueries();
        queryClient.invalidateQueries(['UserProfile'])
        
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
  
  const attemptToDeleteComment =  async (data:DeleteCommentInput) => {
   try {
   
    toast.promise(DeleteCommentAttempt({input:data} ), {
      loading: 'creating in...',
      success: ( {deleteComment:{message} }) => {
        queryClient.invalidateQueries(['comments.infinite'])
        queryClient.invalidateQueries(['commentReplies.infinite'])
        
        return <b>{message}</b>;
      },
      error: (data) => {
        return (
          <ErrorMessage
            className="mb-3"
            title=" Delete Comment failed!"
            error={{
              name: ' Delete Comment failed!',
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
  
  return {
  
    createCommentLoading,
   attemptToCreateComment,
   commentForm,
   attemptToDeleteComment,
   deleteCommentLoading

  }
}