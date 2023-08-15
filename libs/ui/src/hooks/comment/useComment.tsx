"use client"
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorToast } from "../../lib";
import { ErrorMessage } from "../../components";
import { CreateCommentInput, DeleteCommentInput, useCreateCommentMutation, useDeleteCommentMutation } from "@social-zone/graphql";


export const useComment = ()=> {



  const onError = (error: any) => {
 
    errorToast(error);
  };

const {mutateAsync:CreateCommentAttempt,isLoading:createCommentLoading}=useCreateCommentMutation()
const {mutateAsync:DeleteCommentAttempt,isLoading:deleteCommentLoading}=useDeleteCommentMutation()
const queryClient = useQueryClient();


  const attemptToCreateComment = async (data:CreateCommentInput) => {
   try {
   
    toast.promise(CreateCommentAttempt({input:data} ), {
      loading: 'creating in...',
      success: ( {createComment:{message} }) => {
        queryClient.invalidateQueries(['comments.infinite']);
        queryClient.invalidateQueries(['commentReplies.infinite']);
        
        return <b>{message}</b>;
      },
      error: (data) => {
        return (
          <ErrorMessage
            className="mb-3"
            title=" Comment failed!"
            error={{
              name: ' Comment failed!',
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
   attemptToDeleteComment,
   deleteCommentLoading

  }
}