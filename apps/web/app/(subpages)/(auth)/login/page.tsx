import { Metadata } from 'next';
import React from 'react';
import { LoginForm } from './login-form';

const LoginPage = () => {
  return (
    <div className=" layout-container flex items-center justify-center h-screen ">
      <div className="flex h-full min-h-screen w-screen flex-col justify-center !bg-white py-6 px-5 sm:p-8  md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl shadow-400 ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: 'Login',
};
