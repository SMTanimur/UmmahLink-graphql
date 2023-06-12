import { Metadata } from 'next';
import React from 'react';

import { Card, GradientBar, Heading } from '~ui';
import { RegisterForm } from './sign-up.form';

const RegisterPage = () => {
  return (
    <main className="flex flex-col justify-center mx-auto w-full max-w-xl min-h-screen py-10">
			<div className="mb-8 text-center">
				<div className="inline-flex items-center mb-1 space-x-3">
				
					<Heading size="h2">Create a new Account</Heading>
				</div>
				<p className="mt-3 text-gray-500">	Welcome to UmmahLink. A social media platform made for people
							like you! Come, share and see what others are up to!</p>
			</div>
			<Card
				rounded="md"
				className="overflow-hidden sm:mx-auto sm:w-full sm:max-w-md"
			>
				<GradientBar color="indigo" />
				<Card.Body className="py-5">
					<div>
          <RegisterForm/>
          </div>
				</Card.Body>
			</Card>
			
		</main>
  );
};

export default RegisterPage;

export const metadata: Metadata = {
  title: 'sign-up',
};
