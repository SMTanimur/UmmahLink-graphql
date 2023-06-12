
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from '@social-zone/graphql';
import { object, string } from 'zod';
import { useZodForm } from '~ui';


const newUserSchema = object({
  email: string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: string().min(6),
  username: string().min(4, { message: 'This field has to be filled.' }),
});

const loginUserSchema = object({
  email: string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: string().min(6),
});

export const useAuth = () => {

  const { mutateAsync: registerMutation } = useRegisterMutation();
  const { mutateAsync: loginMutation } = useLoginMutation();
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
      toast.promise(registerMutation({ createUserInput:data}), {
        loading: 'Registering...',
        success: ({ createUser }) => <b>{createUser}</b>,
        error: (data) => {
          return <b>{data.message}</b>;
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const login =LoginForm.handleSubmit(async (data) => {
    try {
      toast.promise(loginMutation({ loginInput: data }), {
        loading: 'Logging in...',
        success: ({ login: { message } }) => {
          queryClient.invalidateQueries(useMeQuery.getKey());
          push('/');
          return <b>{message}</b>;
        },
        error: (data) => {
          return <b>{data.message}</b>;
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  // const logout = async () => {
  //   try {
  //     toast.promise(logoutMutation({}), {
  //       loading: 'Logging out...',
  //       success: ({ logout: { message } }) => {
  //         push('/');
  //         queryClient.resetQueries(useMeQuery.getKey());
  //         return <b>{message}</b>;
  //       },
  //       error: 'Failed to Logout!',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return {  signup, login,RegisterForm,LoginForm };
};
