/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@social-zone/client';
import Link from 'next/link';

import { Button, Card, Form, Input, PasswordInput, Spinner } from '~ui';



export const LoginForm = () => {

  const {login,LoginForm,LoginLoading}=useAuth()

  return (
    <div>
      <Form
        form={LoginForm}
        className="space-y-8"
        onSubmit={
         async ()=> await login()

        }
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
     
        <Input
          label="Email"
          type="text"
          placeholder="Email"
          {...LoginForm.register('email')}
        />

        <PasswordInput
          label="Password"
          type="password"
          placeholder="Password"
          {...LoginForm.register('password')}
        />

        <Button
          className="ml-auto"
          type="submit"
          fullWidth
          disabled={LoginLoading}
          icon={
            LoginLoading && <Spinner size="xs" /> 
          }
        >
          Login
        </Button>
      </Form>
      <div>
        <Card rounded="lg" className="mt-4">
          <Card.Body>
            <span className="mr-1">Don’t have an account yet ?</span>
            <Link
              className="font-medium text-brand-600 hover:text-brand-400"
              href="signup"
            >
              Join UmmahLink™
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default function LoginView() {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center !bg-white py-6 px-5 sm:p-8  md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl shadow-400">
      <LoginForm />
    </div>
  );
}
