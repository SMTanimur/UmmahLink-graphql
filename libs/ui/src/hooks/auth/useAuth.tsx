"use client"
import { useQueryClient } from '@tanstack/react-query';
import { useRouter,redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegisterMutation,
} from '@social-zone/graphql';
import { object, string } from 'zod';
import { ErrorMessage, useZodForm } from '../../components';
import { useAtom } from 'jotai';
import { authorizationAtom } from '../authorization-atom';
import { useToken } from '../use-token';



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
    const {setToken,removeToken}=useToken()

     const {mutateAsync:logoutMutation} = useLogoutMutation()
     const [isAuthenticated, setAuthorized] = useAtom(authorizationAtom);
   
  // const { mutateAsync: logoutMutation } = useLogoutMutation();

  const RegisterForm = useZodForm({
    schema: newUserSchema,
  });

  const LoginForm = useZodForm({
    schema: loginUserSchema,
  });

  const queryClient = useQueryClient();
  const { push,replace } = useRouter();

  const signup = RegisterForm.handleSubmit(async (data) => {
    try {
      toast.promise(registerMutation({ createUserInput: data }), {
        loading: 'Registering...',
        success: ({ createUser:{message,token}}) => {
          setToken(token)
          setAuthorized(true)
          queryClient.invalidateQueries(["me"])
          queryClient.invalidateQueries(useMeQuery.getKey());
          replace('/');
          return <b>{message}</b>;
        },
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
        success: ({ login: { message,token } }) => {
          setToken(token)
          setAuthorized(true)
          queryClient.invalidateQueries(["me"])
          queryClient.invalidateQueries(useMeQuery.getKey());
          replace('/');
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
          removeToken()
          setAuthorized(false)
          push('/login');
          queryClient.resetQueries(useMeQuery.getKey());
          queryClient.resetQueries();
          queryClient. removeQueries()
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
    setAuthorized
  };
};
