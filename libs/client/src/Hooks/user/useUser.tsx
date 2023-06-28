/* eslint-disable @nx/enforce-module-boundaries */
import { UpdateUserInput, useMeQuery, useProfileUpdateMutation } from "@social-zone/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ErrorMessage, errorToast } from "~ui";


export const useUser = ()=>{
  const {mutateAsync:UpdateUserMutate,isLoading:UpdateUserLoading} = useProfileUpdateMutation()
  const queryClient = useQueryClient();
  const onError = (error: any) => {
    errorToast(error);
  };
  const attemptToUpdateUser = async (updateUserInput:UpdateUserInput) => {
    try {
      toast.promise(UpdateUserMutate({updateUserInput}), {
        loading: 'Logging in...',
        success: ( {updateUser:{message}}) => {
          queryClient.invalidateQueries(useMeQuery.getKey());
          return <b>{message}</b>;
        },
        error: (data) => {
          return (
            <ErrorMessage
              className="mb-3"
              title=" Update failed!"
              error={{
                name: ' Update failed!',
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
  return {UpdateUserLoading,attemptToUpdateUser}
}