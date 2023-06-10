import { Metadata } from 'next';
import React from 'react';
import { LoginForm } from './login-form';
import { Card, GradientBar, Heading } from '~ui';

const LoginPage = () => {
  return (
    <main className="flex flex-col justify-center mx-auto w-full max-w-xl min-h-screen py-10">
			<div className="mb-8 text-center">
				<div className="inline-flex items-center mb-1 space-x-3">
				
					<Heading size="h2">Login</Heading>
				</div>
				<p className="mt-3 text-gray-500">Welcome back! Sign in to your DogeSocial account.</p>
			</div>
			<Card
				rounded="md"
				className="overflow-hidden sm:mx-auto sm:w-full sm:max-w-md"
			>
				<GradientBar color="indigo" />
				<Card.Body className="py-5">
					<div>
            <LoginForm/>
          </div>
				</Card.Body>
			</Card>
			
		</main>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: 'Login',
};
