/* eslint-disable @next/next/no-img-element */
'use client';

import { FC } from 'react';
import { object, string } from 'zod';
import { Button, Form, Input, PasswordInput, useZodForm } from '~ui';


const newUserSchema = object({
  email: string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: string().min(6),
});

interface LoginFormProps {
  isModal?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ isModal = false }) => {
  // const [createProfile, { data, loading }] = useCreateProfileMutation();

  const form = useZodForm({
    schema: newUserSchema,
  });

  // const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   if (event.target.files?.length) {
  //     try {
  //       setUploading(true);
  //       const attachment = await uploadFileToIPFS(event.target.files[0]);
  //       if (attachment.original.url) {
  //         setAvatar(attachment.original.url);
  //       }
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  return (
    <Form
      form={form}
      className="space-y-8"
      onSubmit={({ email, password }) => {
        console.log(email, password);
        // createProfile({
        //   variables: {
        //     request: {
        //       handle: username,
        //       profilePictureUri: avatar
        //         ? avatar
        //         : getStampFyiURL(address ?? ZERO_ADDRESS)
        //     }
        //   }
        // });
      }}
    >
      {/* {data?.createProfile.__typename === 'RelayError' &&
        data?.createProfile.reason && (
          <ErrorMessage
            className="mb-3"
            title="Create profile failed!"
            error={{
              name: 'Create profile failed!',
              message: relayErrorToString(data?.createProfile?.reason)
            }}
          />
        )} */}
      {/* {isModal && (
        <div className="mb-2 space-y-4">
          <img
            className="h-10 w-10"
            height={40}
            width={40}
            src="/logo.svg"
            alt="Logo"
          />
          <div className="text-xl font-bold">
            <span>Sign up to Family-Daily</span>
          </div>
        </div>
      )} */}
      <Input
        label="Email"
        type="text"
        placeholder="Email"
        {...form.register('email')}
      />

      <PasswordInput
        label="Password"
        type="password"
        placeholder="Password"
        {...form.register('password')}
      />

      <Button
        className="ml-auto"
        type="submit"
        // disabled={loading}
        // icon={
        //   loading ? <Spinner size="xs" /> : <PlusIcon className="h-4 w-4" />
        // }
      >
        <span>Sign up</span>
      </Button>
    </Form>
  );
};

export default function LoginView() {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center !bg-white py-6 px-5 sm:p-8  md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl shadow-400">
      <LoginForm />
    </div>
  );
}
