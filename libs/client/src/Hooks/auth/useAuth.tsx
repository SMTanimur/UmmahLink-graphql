/* eslint-disable @nx/enforce-module-boundaries */
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useLocalStorage from 'use-local-storage';
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegisterMutation,
} from '@social-zone/graphql';
import { object, string } from 'zod';
import { ErrorMessage, useZodForm } from '~ui';


const newUserSchema = object({
  email: string()
    .min(1, { message: 'Minimum 5 characters required' })
    .email('This is not a valid email.'),
  password: string().min(6),
  username: string().min(4, { message: 'Minimum 4 characters required.' }),
  name: string().min(4, { message: 'Minimum 4 characters required' }),
});

const loginUserSchema = object({
  email: string()
    .min(1, { message: 'Minimum 1 characters required' })
    .email('This is not a valid email.'),
  password: string().min(6),
});

export const useAuth = () => {
  const { mutateAsync: registerMutation, isLoading: RegisterLoading } =
    useRegisterMutation();
  const { mutateAsync: loginMutation, isLoading: LoginLoading } =
    useLoginMutation();

     const {mutateAsync:logoutMutation} = useLogoutMutation()
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('loggedIn', false);
  // const { mutateAsync: logoutMutation } = useLogoutMutation();

  const RegisterForm = useZodForm({
    schema: newUserSchema,
  });

  const LoginForm = useZodForm({
    schema: loginUserSchema,
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const signup = RegisterForm.handleSubmit(async (data) => {
    try {
      toast.promise(registerMutation({ createUserInput: data }), {
        loading: 'Registering...',
        success: ({ createUser }) => <b>{createUser}</b>,
        error: (data) => {
          return (
            <ErrorMessage
              className="mb-3"
              title="Create User failed!"
              error={{
                name: 'Create User failed!',
                message: data.message,
              }}
            />
          );
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const login = LoginForm.handleSubmit(async (data) => {
    try {
      toast.promise(loginMutation({ loginInput: data }), {
        loading: 'Logging in...',
        success: ({ login: { message } }) => {
          setIsAuthenticated(true)
          queryClient.invalidateQueries(useMeQuery.getKey());
          push('/');
          return <b>{message}</b>;
        },
        error: (data) => {
          return (
            <ErrorMessage
              className="mb-3"
              title=" Login failed!"
              error={{
                name: ' Login failed!',
                message: data.message,
              }}
            />
          );
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const logout = async () => {
    try {
      toast.promise(logoutMutation({}), {
        loading: 'Logging out...',
        success: ({ logout: { message } }) => {
          setIsAuthenticated(false)
          push('/login');
          queryClient.resetQueries(useMeQuery.getKey());
          return <b>{message}</b>;
        },
        error: 'Failed to Logout!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    signup,
    login,
    logout,
    RegisterForm,
    LoginForm,
    RegisterLoading,
    LoginLoading,
    isAuthenticated,
    setIsAuthenticated
  };
};
