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

export type CreateCommentInput = {
  authId?: InputMaybe<UserInputType>;
  body: Scalars['String']['input'];
  postId?: InputMaybe<Scalars['ID']['input']>;
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
  author?: InputMaybe<UserInputType>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostOrCommentLikeInput = {
  postId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateReplyInput = {
  body: Scalars['String']['input'];
  commentId: Scalars['ID']['input'];
  postId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteCommentInput = {
  commentId: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
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

export type FollowOrUnFollowInput = {
  follow_ID: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type FollowPagination = {
  __typename?: 'FollowPagination';
  docs?: Maybe<Array<Maybe<Pagination>>>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type FollowQueryArgs = {
  target?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  id: Scalars['ID']['output'];
  target?: Maybe<User>;
  user?: Maybe<User>;
};

export type FriendRequestInputType = {
  target?: InputMaybe<UserInputType>;
  user?: InputMaybe<UserInputType>;
};

export type FriendRequestResponse = {
  __typename?: 'FriendRequestResponse';
  target: UserResponse;
  user: UserResponse;
};

export type IUser = {
  __typename?: 'IUser';
  _id: Scalars['ID']['output'];
  avatar: Scalars['String']['output'];
  coverPicture?: Maybe<Scalars['String']['output']>;
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  info?: Maybe<Info>;
  isFollowing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
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
  createComment: MessageResponse;
  createCommentReply: MessageResponse;
  createFriendRequest: FriendRequestResponse;
  createOrUpdateInfo: Scalars['String']['output'];
  createPost: MessageResponse;
  createUser: Scalars['String']['output'];
  deleteComment: MessageResponse;
  deletePost: MessageResponse;
  followUser: MessageResponse;
  likePost: MessageResponse;
  login: LoginResponse;
  logout: MessageResponse;
  unFollowUser: MessageResponse;
  updateNotification: Scalars['Boolean']['output'];
  updatePost: MessageResponse;
  updateUser: MessageResponse;
  uploadMultipleFiles: Array<ResponseSingleUpload>;
  uploadSingleFiles?: Maybe<ResponseSingleUpload>;
};

export type MutationCloseFriendRequestArgs = {
  closeRequestInput: CloseRequestInput;
};

export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};

export type MutationCreateCommentReplyArgs = {
  createReplyInput: CreateReplyInput;
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

export type MutationDeleteCommentArgs = {
  deleteCommentInput: DeleteCommentInput;
};

export type MutationDeletePostArgs = {
  updatePostInput: DeletePostInput;
};

export type MutationFollowUserArgs = {
  followOrUnFollowInput: FollowOrUnFollowInput;
};

export type MutationLikePostArgs = {
  likePostInput: CreatePostOrCommentLikeInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationUnFollowUserArgs = {
  followOrUnFollowInput: FollowOrUnFollowInput;
};

export type MutationUpdateNotificationArgs = {
  updateNotificationArgs: NotificationUpdateArgs;
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

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  initiator?: Maybe<Scalars['ID']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['ID']['output']>;
  type: NotificationType;
  unread?: Maybe<Scalars['Boolean']['output']>;
};

export type NotificationPagination = {
  __typename?: 'NotificationPagination';
  docs?: Maybe<Array<Maybe<Notification>>>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Float']['output'];
  nextPage?: Maybe<Scalars['Float']['output']>;
  page: Scalars['Float']['output'];
  pagingCounter: Scalars['Float']['output'];
  prevPage?: Maybe<Scalars['Float']['output']>;
  totalDocs: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type NotificationQueryArgs = {
  targetId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  unread?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export enum NotificationType {
  Comment = 'comment',
  CommentLike = 'commentLike',
  Follow = 'follow',
  Like = 'like',
  Reply = 'reply',
}

export type NotificationUpdateArgs = {
  notifiId: Scalars['ID']['input'];
  unread?: Scalars['Boolean']['input'];
};

export type PaginateOptionArgs = {
  allowDiskUse?: InputMaybe<Scalars['Boolean']['input']>;
  forceCountFn?: InputMaybe<Scalars['Boolean']['input']>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  useEstimatedCount?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  avatar: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  info?: Maybe<Info>;
  isFollowing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  comments?: Maybe<Array<User>>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<User>>;
};

export type ProfileInformation = {
  __typename?: 'ProfileInformation';
  avatar: Scalars['String']['output'];
  coverPicture?: Maybe<Scalars['String']['output']>;
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  followersCount?: Maybe<Scalars['Float']['output']>;
  followingCount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  info?: Maybe<Info>;
  isFollowing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getFollowers: Array<Pagination>;
  getFollowing: Array<Pagination>;
  getSuggestionPeople: FollowPagination;
  item: Scalars['String']['output'];
  me: IUser;
  notifications: NotificationPagination;
  post: Post;
  user?: Maybe<ProfileInformation>;
};

export type QueryGetFollowersArgs = {
  option: PaginateOptionArgs;
  query: FollowQueryArgs;
};

export type QueryGetFollowingArgs = {
  option: PaginateOptionArgs;
  query: FollowQueryArgs;
};

export type QueryGetSuggestionPeopleArgs = {
  option: PaginateOptionArgs;
  query: FollowQueryArgs;
};

export type QueryNotificationsArgs = {
  allowDiskUse?: InputMaybe<Scalars['Boolean']['input']>;
  forceCountFn?: InputMaybe<Scalars['Boolean']['input']>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  query: NotificationQueryArgs;
  select?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  useEstimatedCount?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryPostArgs = {
  postId: Scalars['ID']['input'];
};

export type QueryUserArgs = {
  username: Scalars['String']['input'];
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
  author?: InputMaybe<UserInputType>;
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
  friendRequests?: InputMaybe<Array<FriendRequestInputType>>;
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
  friendRequests?: Maybe<Array<FriendRequest>>;
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
  friendRequests?: InputMaybe<Array<FriendRequestInputType>>;
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
  friendRequests?: Maybe<Array<FriendRequest>>;
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

export type FollowUserMutationVariables = Exact<{
  followOrUnFollowInput: FollowOrUnFollowInput;
}>;

export type FollowUserMutation = {
  __typename?: 'Mutation';
  followUser: { __typename: 'MessageResponse'; message: string };
};

export type UnFollowUserMutationVariables = Exact<{
  followOrUnFollowInput: FollowOrUnFollowInput;
}>;

export type UnFollowUserMutation = {
  __typename?: 'Mutation';
  unFollowUser: { __typename: 'MessageResponse'; message: string };
};

export type ProfileUpdateMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;

export type ProfileUpdateMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'MessageResponse'; message: string };
};

export type GetFollowersQueryVariables = Exact<{
  options: PaginateOptionArgs;
  query: FollowQueryArgs;
}>;

export type GetFollowersQuery = {
  __typename?: 'Query';
  getFollowers: Array<{
    __typename?: 'Pagination';
    avatar: string;
    email: string;
    id: string;
    isFollowing: boolean;
    name: string;
    username?: string | null;
    info?: {
      __typename?: 'Info';
      bio?: string | null;
      birthday?: any | null;
      contact?: string | null;
      gender?: EGender | null;
    } | null;
  }>;
};

export type GetFollowingQueryVariables = Exact<{
  options: PaginateOptionArgs;
  query: FollowQueryArgs;
}>;

export type GetFollowingQuery = {
  __typename?: 'Query';
  getFollowing: Array<{
    __typename?: 'Pagination';
    avatar: string;
    email: string;
    id: string;
    isFollowing: boolean;
    name: string;
    username?: string | null;
    info?: {
      __typename?: 'Info';
      bio?: string | null;
      birthday?: any | null;
      contact?: string | null;
      gender?: EGender | null;
    } | null;
  }>;
};

export type GetSuggestionPeopleQueryVariables = Exact<{
  options: PaginateOptionArgs;
  query: FollowQueryArgs;
}>;

export type GetSuggestionPeopleQuery = {
  __typename?: 'Query';
  getSuggestionPeople: {
    __typename?: 'FollowPagination';
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
    docs?: Array<{
      __typename: 'Pagination';
      avatar: string;
      email: string;
      id: string;
      isFollowing: boolean;
      name: string;
      username?: string | null;
    } | null> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'IUser';
    avatar: string;
    username: string;
    name: string;
    email?: string | null;
    coverPicture?: string | null;
    _id: string;
    info?: {
      __typename?: 'Info';
      bio?: string | null;
      birthday?: any | null;
      contact?: string | null;
    } | null;
  };
};

export type UserProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;

export type UserProfileQuery = {
  __typename?: 'Query';
  user?: {
    __typename: 'ProfileInformation';
    username: string;
    name: string;
    avatar: string;
    coverPicture?: string | null;
    dateJoined?: any | null;
    email: string;
    followersCount?: number | null;
    followingCount?: number | null;
    id: string;
    isFollowing: boolean;
    info?: {
      __typename?: 'Info';
      bio?: string | null;
      birthday?: any | null;
      contact?: string | null;
      gender?: EGender | null;
    } | null;
  } | null;
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
export const FollowUserDocument = /*#__PURE__*/ `
    mutation FollowUser($followOrUnFollowInput: FollowOrUnFollowInput!) {
  followUser(followOrUnFollowInput: $followOrUnFollowInput) {
    message
    __typename
  }
}
    `;
export const useFollowUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    FollowUserMutation,
    TError,
    FollowUserMutationVariables,
    TContext
  >
) =>
  useMutation<
    FollowUserMutation,
    TError,
    FollowUserMutationVariables,
    TContext
  >(
    ['FollowUser'],
    (variables?: FollowUserMutationVariables) =>
      fetcher<FollowUserMutation, FollowUserMutationVariables>(
        FollowUserDocument,
        variables
      )(),
    options
  );
useFollowUserMutation.getKey = () => ['FollowUser'];

useFollowUserMutation.fetcher = (
  variables: FollowUserMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
    variables,
    options
  );
export const UnFollowUserDocument = /*#__PURE__*/ `
    mutation unFollowUser($followOrUnFollowInput: FollowOrUnFollowInput!) {
  unFollowUser(followOrUnFollowInput: $followOrUnFollowInput) {
    message
    __typename
  }
}
    `;
export const useUnFollowUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UnFollowUserMutation,
    TError,
    UnFollowUserMutationVariables,
    TContext
  >
) =>
  useMutation<
    UnFollowUserMutation,
    TError,
    UnFollowUserMutationVariables,
    TContext
  >(
    ['unFollowUser'],
    (variables?: UnFollowUserMutationVariables) =>
      fetcher<UnFollowUserMutation, UnFollowUserMutationVariables>(
        UnFollowUserDocument,
        variables
      )(),
    options
  );
useUnFollowUserMutation.getKey = () => ['unFollowUser'];

useUnFollowUserMutation.fetcher = (
  variables: UnFollowUserMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<UnFollowUserMutation, UnFollowUserMutationVariables>(
    UnFollowUserDocument,
    variables,
    options
  );
export const ProfileUpdateDocument = /*#__PURE__*/ `
    mutation profileUpdate($updateUserInput: UpdateUserInput!) {
  updateUser(input: $updateUserInput) {
    message
  }
}
    `;
export const useProfileUpdateMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ProfileUpdateMutation,
    TError,
    ProfileUpdateMutationVariables,
    TContext
  >
) =>
  useMutation<
    ProfileUpdateMutation,
    TError,
    ProfileUpdateMutationVariables,
    TContext
  >(
    ['profileUpdate'],
    (variables?: ProfileUpdateMutationVariables) =>
      fetcher<ProfileUpdateMutation, ProfileUpdateMutationVariables>(
        ProfileUpdateDocument,
        variables
      )(),
    options
  );
useProfileUpdateMutation.getKey = () => ['profileUpdate'];

useProfileUpdateMutation.fetcher = (
  variables: ProfileUpdateMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<ProfileUpdateMutation, ProfileUpdateMutationVariables>(
    ProfileUpdateDocument,
    variables,
    options
  );
export const GetFollowersDocument = /*#__PURE__*/ `
    query GetFollowers($options: PaginateOptionArgs!, $query: FollowQueryArgs!) {
  getFollowers(option: $options, query: $query) {
    avatar
    email
    id
    isFollowing
    name
    username
    info {
      bio
      birthday
      contact
      gender
    }
  }
}
    `;
export const useGetFollowersQuery = <
  TData = GetFollowersQuery,
  TError = unknown
>(
  variables: GetFollowersQueryVariables,
  options?: UseQueryOptions<GetFollowersQuery, TError, TData>
) =>
  useQuery<GetFollowersQuery, TError, TData>(
    ['GetFollowers', variables],
    fetcher<GetFollowersQuery, GetFollowersQueryVariables>(
      GetFollowersDocument,
      variables
    ),
    options
  );

useGetFollowersQuery.getKey = (variables: GetFollowersQueryVariables) => [
  'GetFollowers',
  variables,
];
useGetFollowersQuery.fetcher = (
  variables: GetFollowersQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetFollowersQuery, GetFollowersQueryVariables>(
    GetFollowersDocument,
    variables,
    options
  );
export const GetFollowingDocument = /*#__PURE__*/ `
    query GetFollowing($options: PaginateOptionArgs!, $query: FollowQueryArgs!) {
  getFollowing(option: $options, query: $query) {
    avatar
    email
    id
    isFollowing
    name
    username
    info {
      bio
      birthday
      contact
      gender
    }
  }
}
    `;
export const useGetFollowingQuery = <
  TData = GetFollowingQuery,
  TError = unknown
>(
  variables: GetFollowingQueryVariables,
  options?: UseQueryOptions<GetFollowingQuery, TError, TData>
) =>
  useQuery<GetFollowingQuery, TError, TData>(
    ['GetFollowing', variables],
    fetcher<GetFollowingQuery, GetFollowingQueryVariables>(
      GetFollowingDocument,
      variables
    ),
    options
  );

useGetFollowingQuery.getKey = (variables: GetFollowingQueryVariables) => [
  'GetFollowing',
  variables,
];
useGetFollowingQuery.fetcher = (
  variables: GetFollowingQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetFollowingQuery, GetFollowingQueryVariables>(
    GetFollowingDocument,
    variables,
    options
  );
export const GetSuggestionPeopleDocument = /*#__PURE__*/ `
    query GetSuggestionPeople($options: PaginateOptionArgs!, $query: FollowQueryArgs!) {
  getSuggestionPeople(option: $options, query: $query) {
    docs {
      avatar
      email
      id
      isFollowing
      name
      username
      __typename
    }
    limit
    page
    totalDocs
    totalPages
  }
}
    `;
export const useGetSuggestionPeopleQuery = <
  TData = GetSuggestionPeopleQuery,
  TError = unknown
>(
  variables: GetSuggestionPeopleQueryVariables,
  options?: UseQueryOptions<GetSuggestionPeopleQuery, TError, TData>
) =>
  useQuery<GetSuggestionPeopleQuery, TError, TData>(
    ['GetSuggestionPeople', variables],
    fetcher<GetSuggestionPeopleQuery, GetSuggestionPeopleQueryVariables>(
      GetSuggestionPeopleDocument,
      variables
    ),
    options
  );

useGetSuggestionPeopleQuery.getKey = (
  variables: GetSuggestionPeopleQueryVariables
) => ['GetSuggestionPeople', variables];
useGetSuggestionPeopleQuery.fetcher = (
  variables: GetSuggestionPeopleQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetSuggestionPeopleQuery, GetSuggestionPeopleQueryVariables>(
    GetSuggestionPeopleDocument,
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
    coverPicture
    info {
      bio
      birthday
      contact
    }
    _id
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
export const UserProfileDocument = /*#__PURE__*/ `
    query UserProfile($username: String!) {
  user(username: $username) {
    username
    name
    avatar
    coverPicture
    info {
      bio
      birthday
      contact
      gender
    }
    name
    dateJoined
    email
    followersCount
    followingCount
    id
    isFollowing
    __typename
  }
}
    `;
export const useUserProfileQuery = <TData = UserProfileQuery, TError = unknown>(
  variables: UserProfileQueryVariables,
  options?: UseQueryOptions<UserProfileQuery, TError, TData>
) =>
  useQuery<UserProfileQuery, TError, TData>(
    ['UserProfile', variables],
    fetcher<UserProfileQuery, UserProfileQueryVariables>(
      UserProfileDocument,
      variables
    ),
    options
  );

useUserProfileQuery.getKey = (variables: UserProfileQueryVariables) => [
  'UserProfile',
  variables,
];
useUserProfileQuery.fetcher = (
  variables: UserProfileQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    variables,
    options
  );
