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

export type CreateOrUpdateProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<EGender>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateInfo: Scalars['String']['output'];
  createUser: Scalars['String']['output'];
  login: LoginResponse;
  updateUser: Scalars['String']['output'];
  uploadMultipleFiles: Array<ResponseSingleUpload>;
  uploadSingleFiles?: Maybe<ResponseSingleUpload>;
};

export type MutationCreateOrUpdateInfoArgs = {
  createOrUpdateProfileInput: CreateOrUpdateProfileInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
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

export type Query = {
  __typename?: 'Query';
  item: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  me: UserWithoutPassword;
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

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  info?: InputMaybe<InfoInputType>;
  isOwnProfile?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
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
  firstName?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Info>;
  isOwnProfile?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInputType = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  info?: InputMaybe<InfoInputType>;
  isOwnProfile?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  avatar?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Info>;
  isOwnProfile?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
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
    email: string;
    coverPicture?: string | null;
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
    email
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
