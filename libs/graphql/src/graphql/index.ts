import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum EGender {
  Female = 'female',
  Male = 'male',
  Unspecified = 'unspecified'
}

export type ImageInput = {
  __typename?: 'ImageInput';
  public_id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Info = {
  __typename?: 'Info';
  bio?: Maybe<Scalars['String']['output']>;
  birthday: Scalars['DateTime']['output'];
  gender?: Maybe<EGender>;
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
  createUser: User;
  login: LoginResponse;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  logout: Scalars['String']['output'];
  whoAmI: UserWithoutPassword;
};

export type User = {
  __typename?: 'User';
  coverPicture?: Maybe<ImageInput>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Info>;
  isOwnProfile?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<ImageInput>;
  username: Scalars['String']['output'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  coverPicture?: Maybe<ImageInput>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Info>;
  isOwnProfile?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<ImageInput>;
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', message: string } };


export const LoginDocument = /*#__PURE__*/ `
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    message
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
useLoginMutation.getKey = () => ['Login'];

useLoginMutation.fetcher = (variables: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables);