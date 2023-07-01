"use client"


import { object, string } from 'zod';

import {  Button, Card,  ErrorMessage,  Form,  Input, Regex, Spinner, TextArea,  errorToast, useProfileQuery, useZodForm } from '~ui';
import { IUser,  useMeQuery, useProfileUpdateMutation } from '@social-zone/graphql';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';

const editProfileSchema = object({
  name: string()
    .regex(Regex.profileNameValidator, {
      message: `Profile name must not contain restricted symbols`
    }),
    bio: string(),
    // gender: string(),
    // avatar: string(),
    // coverPicture: string(),
    username:string(),
    contact: string(),
    // birthday: string().datetime({ message: `Birthday should be a valid date` }),
});

interface ProfileSettingsFormProps {
  profile: IUser
}

const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({ profile }) => {


  const {mutateAsync:UpdateUserMutate,isLoading:UpdateUserLoading} = useProfileUpdateMutation()
  const queryClient = useQueryClient();
  const onError = (error: any) => {
    errorToast(error);
  };

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      name: profile?.name ?? '',
      username: profile?.username ?? '',
      bio: profile?.bio ?? '',
      // birthday: profile?.birthday ?? '',
      contact: profile?.contact ?? ''
    }
  });

  const attemptToUpdateUser= form.handleSubmit(async (data) => {
    try {
      console.log(data)
      toast.promise( UpdateUserMutate({updateUserInput:data}), {
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
    });




  return (
    <>
      <Card className="p-5">
        <Form
          form={form}
          className="space-y-4"
          onSubmit={async ()=> await attemptToUpdateUser()}
        >
          {/* {error && (
            <ErrorMessage
              className="mb-3"
              title={t`Transaction failed!`}
              error={error}
            />
          )} */}
        
          <Input
            label='Name'
            type="text"
            placeholder="Gavin"
            {...form.register('name')}
          />
          <Input
            label='Username'
            type="text"
            placeholder="Gavin"
            className='cursor-not-allowed'
            disabled
            {...form.register('username')}
          />
          <Input
            label='Contact'
            type="text"
            placeholder="Contact"
            {...form.register('contact')}
          />
          {/* <Input
            label='Name'
            type="text"
            placeholder=""
            {...form.register('name')}
          /> */}
          
          <TextArea
            label={`Bio`}
            placeholder={`Tell us something about you!`}
            {...form.register('bio')}
          />
       
          <Button
            className="ml-auto"
            type="submit"
            disabled={UpdateUserLoading}
            icon={
              UpdateUserLoading? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            <span>Save</span>
          </Button>
        </Form>
      </Card>
     
    </>
  );
};

export default ProfileSettingsForm;
