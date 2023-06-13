import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { fetcher } from '../configs';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type CloseRequestInput = {
  status: Scalars['String']['input'];
  target?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateFriendRequestInput = {
  target?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateOrUpdateProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<EGender>;
  user?: InputMaybe<UserInputType>;
};

export type CreatePostInput = {
  author?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeletePostInput = {
  postId: Scalars['ID']['input'];
  user?: InputMaybe<Scalars['ID']['input']>;
};

export enum EGender {
  Female = 'female',
  Male = 'male',
  Unspecified = 'unspecified',
}

export enum EnumService {
  Cloudinary = 'Cloudinary',
  S3Storage = 'S3Storage',
  Web3Storage = 'Web3Storage',
}

export type FriendRequestResponse = {
  __typename?: 'FriendRequestResponse';
  target: UserResponse;
  user: UserResponse;
};

export type Info = {
  __typename?: 'Info';
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<EGender>;
  id: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type InfoInputType = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<EGender>;
  user?: InputMaybe<UserInputType>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String']['output'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  closeFriendRequest: UserWithoutPassword;
  createFriendRequest: FriendRequestResponse;
  createOrUpdateInfo: Scalars['String']['output'];
  createPost: MessageResponse;
  createUser: Scalars['String']['output'];
  deletePost: MessageResponse;
  login: LoginResponse;
  logout: MessageResponse;
  updatePost: MessageResponse;
  updateUser: Scalars['String']['output'];
  uploadMultipleFiles: Array<ResponseSingleUpload>;
  uploadSingleFiles?: Maybe<ResponseSingleUpload>;
};

export type MutationCloseFriendRequestArgs = {
  closeRequestInput: CloseRequestInput;
};

export type MutationCreateFriendRequestArgs = {
  createFriendRequestInput: CreateFriendRequestInput;
};

export type MutationCreateOrUpdateInfoArgs = {
  createOrUpdateProfileInput: CreateOrUpdateProfileInput;
};

export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationDeletePostArgs = {
  updatePostInput: DeletePostInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUploadMultipleFilesArgs = {
  files: Array<Scalars['Upload']['input']>;
  setting: UploadParamInput;
};

export type MutationUploadSingleFilesArgs = {
  file: Scalars['Upload']['input'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<Scalars['ID']['output']>;
  comments?: Maybe<Array<User>>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<User>>;
};

export type Query = {
  __typename?: 'Query';
  item: Scalars['String']['output'];
  me: UserWithoutPassword;
  post: Post;
};

export type QueryPostArgs = {
  postId: Scalars['ID']['input'];
};

export type ResponseSingleUpload = {
  __typename?: 'ResponseSingleUpload';
  bytes: Scalars['Float']['output'];
  folder: Scalars['String']['output'];
  format: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Float']['output'];
};

export type UpdatePostInput = {
  author?: InputMaybe<Scalars['ID']['input']>;
  comments?: InputMaybe<Array<UserInputType>>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  likes?: InputMaybe<Array<UserInputType>>;
  postId: Scalars['ID']['input'];
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  friendRequests?: InputMaybe<UserInputType>;
  friends?: InputMaybe<UserInputType>;
  info?: InputMaybe<InfoInputType>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UploadParamInput = {
  folder: Scalars['String']['input'];
  uploadService: EnumService;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  friendRequests?: Maybe<User>;
  friends?: Maybe<User>;
  info?: Maybe<Info>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInputType = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  friendRequests?: InputMaybe<UserInputType>;
  friends?: InputMaybe<UserInputType>;
  info?: InputMaybe<InfoInputType>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  avatar: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  avatar?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  friendRequests?: Maybe<User>;
  friends?: Maybe<User>;
  info?: Maybe<Info>;
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResponse'; message: string };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout: { __typename?: 'MessageResponse'; message: string };
};

export type RegisterMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation'; createUser: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'UserWithoutPassword';
    avatar?: string | null;
    username: string;
    name: string;
    email: string;
    coverPicture?: string | null;
    info?: {
      __typename?: 'Info';
      bio?: string | null;
      birthday?: any | null;
      contact?: string | null;
      gender?: EGender | null;
    } | null;
  };
};

export const LoginDocument = /*#__PURE__*/ `
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    message
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['Login'],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        variables
      )(),
    options
  );
useLoginMutation.getKey = () => ['Login'];

useLoginMutation.fetcher = (
  variables: LoginMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    variables,
    options
  );
export const LogoutDocument = /*#__PURE__*/ `
    mutation logout {
  logout {
    message
  }
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LogoutMutation,
    TError,
    LogoutMutationVariables,
    TContext
  >
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    ['logout'],
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        variables
      )(),
    options
  );
useLogoutMutation.getKey = () => ['logout'];

useLogoutMutation.fetcher = (
  variables?: LogoutMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    variables,
    options
  );
export const RegisterDocument = /*#__PURE__*/ `
    mutation Register($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput)
}
    `;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    ['Register'],
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        variables
      )(),
    options
  );
useRegisterMutation.getKey = () => ['Register'];

useRegisterMutation.fetcher = (
  variables: RegisterMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    variables,
    options
  );
export const MeDocument = /*#__PURE__*/ `
    query me {
  me {
    avatar
    username
    name
    email
    info {
      bio
      birthday
      contact
      gender
    }
    coverPicture
  }
}
    `;
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ['me'] : ['me', variables],
    fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
    options
  );

useMeQuery.getKey = (variables?: MeQueryVariables) =>
  variables === undefined ? ['me'] : ['me', variables];
useMeQuery.fetcher = (
  variables?: MeQueryVariables,
  options?: RequestInit['headers']
) => fetcher<MeQuery, MeQueryVariables>(MeDocument, variables, options);
