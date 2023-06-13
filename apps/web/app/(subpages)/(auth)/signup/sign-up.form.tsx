/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@social-zone/client';
import Link from 'next/link';

import { Button, Card, Form, Input, PasswordInput, Spinner } from '~ui';




export const RegisterForm= () => {


const {signup,RegisterForm,RegisterLoading}=useAuth()
  return (
    <div>
      <Form
        form={RegisterForm}
        className="space-y-8"
        onSubmit={async ()=> await signup()}
      >

        <Input
          label="Email"
          type="text"
          placeholder="Email"
          {...RegisterForm.register('email')}
        />
        <Input
          label="Name"
          type="text"
          placeholder="Name"
          {...RegisterForm.register('name')}
        />
        <Input
        label='Username'
        type='text'
        placeholder='Username'
        {...RegisterForm.register('username')}
        />
      
        <PasswordInput
          label="Password"
          type="password"
          placeholder="Password"
          {...RegisterForm.register('password')}
        />

        <Button
          className="ml-auto"
          type="submit"
          fullWidth
          disabled={RegisterLoading}
          icon={
            RegisterLoading && <Spinner size="xs" /> 
          }
        >
          <span>Register</span>
        </Button>
      </Form>
      <div>
        <Card rounded="lg" className="mt-4">
          <Card.Body>
          <span className="mr-1">Already have an account ?</span>
						<Link
							className="font-medium text-brand-600 hover:text-brand-400"
							href="/login"
						>
							Log into UmmahLink™
						</Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};