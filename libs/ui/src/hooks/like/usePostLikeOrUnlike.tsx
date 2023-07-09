
"use client"


import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { errorToast } from "../../lib";
import { ErrorMessage } from "../../components";
import {  useLikeOrUnlikePostMutation } from "@social-zone/graphql";

export const usePostLikeOrUnlike = ()=> {

  const onError = (error: any) => {
 
    errorToast(error);
  };

const {mutateAsync:PostLikeOrUnlikeMutate,isLoading:LikeLoading} = useLikeOrUnlikePostMutation()

const queryClient = useQueryClient();

  const attemtToPostLikeOrUnlike = async (postId:string) => {
   try {
    toast.promise(PostLikeOrUnlikeMutate({createLikeOrUnlike:{postId: postId} }), {
      loading: 'LikeOrUnlike Processing ...',
      success: ( {likeOrUnlikePost:{message}}) => {
        queryClient.invalidateQueries(['UserProfile'])
        queryClient.invalidateQueries(['GetFeed.infinite'])
        return <b>{message}</b>;
      },
      error: (data) => {
        return (
          <ErrorMessage
            className="mb-3"
            title=" Like failed!"
            error={{
              name: ' Like failed!',
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
    attemtToPostLikeOrUnlike,
    LikeLoading,
   
  }
}