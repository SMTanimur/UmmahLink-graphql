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
};

export type Author = {
  __typename?: 'Author';
  avatar: AvatarImage;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AvatarImage = {
  __typename?: 'AvatarImage';
  avatarPublicId?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
};

export type AvatarImageInfo = {
  __typename?: 'AvatarImageInfo';
  avatarPublicId?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
};

export type AvatarImageInput = {
  avatarPublicId?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CloseRequestInput = {
  status: Scalars['String']['input'];
  target?: InputMaybe<Scalars['ID']['input']>;
};

export type CommentAuthor = {
  __typename?: 'CommentAuthor';
  avatar?: Maybe<AvatarImage>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CommentPaginate = {
  __typename?: 'CommentPaginate';
  author: CommentAuthor;
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  depth: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isEdited?: Maybe<Scalars['Boolean']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  isOwnComment: Scalars['Boolean']['output'];
  isPostOwner: Scalars['Boolean']['output'];
  likesCount: Scalars['Int']['output'];
  post_id?: Maybe<Scalars['ID']['output']>;
  replyCount: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentPagination = {
  __typename?: 'CommentPagination';
  docs?: Maybe<Array<Maybe<CommentPaginate>>>;
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

export type CommentsQueryArgs = {
  postId: Scalars['ID']['input'];
  user?: InputMaybe<UserInputType>;
};

export type CoverImage = {
  __typename?: 'CoverImage';
  coverPublicId?: Maybe<Scalars['String']['output']>;
  coverUrl?: Maybe<Scalars['String']['output']>;
};

export type CoverImageInfo = {
  __typename?: 'CoverImageInfo';
  coverPublicId?: Maybe<Scalars['String']['output']>;
  coverUrl?: Maybe<Scalars['String']['output']>;
};

export type CoverImageInput = {
  coverPublicId?: InputMaybe<Scalars['String']['input']>;
  coverUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCommentInput = {
  _post_id?: InputMaybe<Scalars['ID']['input']>;
  authId?: InputMaybe<UserInputType>;
  body: Scalars['String']['input'];
};

export type CreateFriendRequestInput = {
  target?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type CreatePostInput = {
  _author_id?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<PhotosImageInput>>;
};

export type CreatePostOrCommentLikeInput = {
  comment_id?: InputMaybe<Scalars['ID']['input']>;
  postId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateReplyInput = {
  _post_id: Scalars['ID']['input'];
  body: Scalars['String']['input'];
  commentId: Scalars['ID']['input'];
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
  userID?: InputMaybe<Scalars['ID']['input']>;
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
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserInputType>;
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

export type GetFeedDto = {
  allowDiskUse?: InputMaybe<Scalars['Boolean']['input']>;
  forceCountFn?: InputMaybe<Scalars['Boolean']['input']>;
  lean?: InputMaybe<Scalars['Boolean']['input']>;
  leanWithId?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  orderBy?: InputMaybe<QueryPostOrderByColumn>;
  page?: InputMaybe<Scalars['Float']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  sortedBy?: InputMaybe<SortOrder>;
  useEstimatedCount?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetLikeResponse = {
  __typename?: 'GetLikeResponse';
  _id: Scalars['ID']['output'];
  avatar: AvatarImage;
  isFollowing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type IUser = {
  __typename?: 'IUser';
  _id: Scalars['ID']['output'];
  avatar: AvatarImage;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<CoverImage>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  isFollowing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LikesQueryArgs = {
  commentId?: InputMaybe<Scalars['ID']['input']>;
  postId?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
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
  createPost: MessageResponse;
  createUser: Scalars['String']['output'];
  deleteComment: MessageResponse;
  deletePost: MessageResponse;
  followUser: MessageResponse;
  likeOrUnlikeComment: MessageResponse;
  likeOrUnlikePost: MessageResponse;
  login: LoginResponse;
  logout: MessageResponse;
  markNotification: NotificationResponse;
  unFollowUser: MessageResponse;
  updateComment: MessageResponse;
  updateNotification: NotificationResponse;
  updatePost: MessageResponse;
  updateUser: MessageResponse;
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
  deletePostInput: DeletePostInput;
};

export type MutationFollowUserArgs = {
  followOrUnFollowInput: FollowOrUnFollowInput;
};

export type MutationLikeOrUnlikeCommentArgs = {
  likeOrUnlikeCommentInput: CreatePostOrCommentLikeInput;
};

export type MutationLikeOrUnlikePostArgs = {
  likeOrUnlikePostInput: CreatePostOrCommentLikeInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationMarkNotificationArgs = {
  markNotificationArgs: NotificationCountQueryArgs;
};

export type MutationUnFollowUserArgs = {
  followOrUnFollowInput: FollowOrUnFollowInput;
};

export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type MutationUpdateNotificationArgs = {
  updateNotificationArgs: NotificationUpdateArgs;
};

export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  username: Scalars['String']['input'];
};

export type NewsFeedPaginate = {
  __typename?: 'NewsFeedPaginate';
  author?: Maybe<Author>;
  commentsCount?: Maybe<Scalars['Float']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  isOwnPost?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Float']['output']>;
  photos?: Maybe<Array<PhotosImageInfo>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NewsFeedPagination = {
  __typename?: 'NewsFeedPagination';
  docs?: Maybe<Array<Maybe<NewsFeedPaginate>>>;
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

export type NewsFeedQueryArgs = {
  user?: InputMaybe<UserInputType>;
};

export type NotificationCount = {
  __typename?: 'NotificationCount';
  count: Scalars['Int']['output'];
};

export type NotificationCountQueryArgs = {
  user?: InputMaybe<UserInputType>;
};

export type NotificationPaginate = {
  __typename?: 'NotificationPaginate';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  initiator: NotificationUser;
  link: Scalars['String']['output'];
  target: NotificationUser;
  type: NotificationType;
  unread: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NotificationPagination = {
  __typename?: 'NotificationPagination';
  docs?: Maybe<Array<Maybe<NotificationPaginate>>>;
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
  type?: InputMaybe<Scalars['String']['input']>;
  unread?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<UserInputType>;
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  state: Scalars['Boolean']['output'];
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
};

export type NotificationUser = {
  __typename?: 'NotificationUser';
  avatar: AvatarImage;
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
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
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  useEstimatedCount?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  avatar: AvatarImage;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isFollowing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type PhotosImageInfo = {
  __typename?: 'PhotosImageInfo';
  photosPublicId?: Maybe<Scalars['String']['output']>;
  photosUrl?: Maybe<Scalars['String']['output']>;
};

export type PhotosImageInput = {
  photosPublicId?: InputMaybe<Scalars['String']['input']>;
  photosUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  _author_id?: Maybe<Scalars['ID']['output']>;
  comments?: Maybe<Array<User>>;
  content?: Maybe<Scalars['String']['output']>;
  /** Created At */
  createdAt: Scalars['DateTime']['output'];
  likes?: Maybe<Array<User>>;
  photos?: Maybe<Array<PhotosImageInfo>>;
  /** Updated At */
  updatedAt: Scalars['DateTime']['output'];
};

export type ProfileInformation = {
  __typename?: 'ProfileInformation';
  avatar?: Maybe<AvatarImage>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<CoverImage>;
  email: Scalars['String']['output'];
  followersCount?: Maybe<Scalars['Float']['output']>;
  followingCount?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isFollowing: Scalars['Boolean']['output'];
  isOwnProfile: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getComments?: Maybe<CommentPagination>;
  getFeeds: NewsFeedPagination;
  getFollowers: FollowPagination;
  getFollowing: FollowPagination;
  getNotificationCount: NotificationCount;
  getNotifications: NotificationPagination;
  getPostLikes: Array<GetLikeResponse>;
  getPosts: NewsFeedPagination;
  getReplies?: Maybe<CommentPagination>;
  getSuggestionPeople?: Maybe<FollowPagination>;
  me: IUser;
  post: Post;
  searchUser?: Maybe<Array<IUser>>;
  user?: Maybe<ProfileInformation>;
};

export type QueryGetCommentsArgs = {
  option: PaginateOptionArgs;
  query: CommentsQueryArgs;
};

export type QueryGetFeedsArgs = {
  option: GetFeedDto;
  query: NewsFeedQueryArgs;
};

export type QueryGetFollowersArgs = {
  option: PaginateOptionArgs;
  query: FollowQueryArgs;
  username: Scalars['String']['input'];
};

export type QueryGetFollowingArgs = {
  option: PaginateOptionArgs;
  query: FollowQueryArgs;
  username: Scalars['String']['input'];
};

export type QueryGetNotificationCountArgs = {
  query: NotificationCountQueryArgs;
};

export type QueryGetNotificationsArgs = {
  options: PaginateOptionArgs;
  query: NotificationQueryArgs;
};

export type QueryGetPostLikesArgs = {
  option: PaginateOptionArgs;
  query: LikesQueryArgs;
};

export type QueryGetPostsArgs = {
  option: GetFeedDto;
  query: NewsFeedQueryArgs;
  username: Scalars['String']['input'];
};

export type QueryGetRepliesArgs = {
  option: PaginateOptionArgs;
  query: ReplyQueryArgs;
};

export type QueryGetSuggestionPeopleArgs = {
  option: PaginateOptionArgs;
  query: FollowQueryArgs;
};

export type QueryPostArgs = {
  postId: Scalars['ID']['input'];
};

export type QuerySearchUserArgs = {
  option: PaginateOptionArgs;
  query: SearchDto;
};

export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export enum QueryPostOrderByColumn {
  CreatedAt = 'CREATED_AT',
  Orders = 'ORDERS',
  Rating = 'RATING',
  UpdatedAt = 'UPDATED_AT',
}

export type ReplyQueryArgs = {
  comment_id: Scalars['ID']['input'];
  post_id: Scalars['ID']['input'];
  user?: InputMaybe<UserInputType>;
};

export type SearchDto = {
  keyword: Scalars['String']['input'];
  user?: InputMaybe<UserInputType>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type UpdateCommentInput = {
  _post_id?: InputMaybe<Scalars['ID']['input']>;
  authId?: InputMaybe<UserInputType>;
  body?: InputMaybe<Scalars['String']['input']>;
  commentId: Scalars['ID']['input'];
  depth?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isEdited?: InputMaybe<Scalars['Boolean']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  parents?: InputMaybe<Array<Scalars['ID']['input']>>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePostInput = {
  _author_id?: InputMaybe<Scalars['ID']['input']>;
  comments?: InputMaybe<Array<UserInputType>>;
  content?: InputMaybe<Scalars['String']['input']>;
  /** Created At */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  likes?: InputMaybe<Array<UserInputType>>;
  photos?: InputMaybe<Array<PhotosImageInput>>;
  postId: Scalars['ID']['input'];
  /** Updated At */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<AvatarImageInput>;
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<CoverImageInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  friendRequests?: InputMaybe<Array<FriendRequestInputType>>;
  friends?: InputMaybe<UserInputType>;
  gender?: InputMaybe<EGender>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar: AvatarImageInfo;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<CoverImageInfo>;
  email: Scalars['String']['output'];
  friendRequests?: Maybe<Array<FriendRequest>>;
  friends?: Maybe<User>;
  gender?: Maybe<EGender>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInputType = {
  avatar: AvatarImageInput;
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<CoverImageInput>;
  email: Scalars['String']['input'];
  friendRequests?: InputMaybe<Array<FriendRequestInputType>>;
  friends?: InputMaybe<UserInputType>;
  gender?: InputMaybe<EGender>;
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
  avatar: AvatarImageInfo;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<CoverImageInfo>;
  email: Scalars['String']['output'];
  friendRequests?: Maybe<Array<FriendRequest>>;
  friends?: Maybe<User>;
  gender?: Maybe<EGender>;
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

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: { __typename: 'MessageResponse'; message: string };
};

export type ReplyCommentMutationVariables = Exact<{
  input: CreateReplyInput;
}>;

export type ReplyCommentMutation = {
  __typename?: 'Mutation';
  createCommentReply: { __typename: 'MessageResponse'; message: string };
};

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;

export type DeleteCommentMutation = {
  __typename?: 'Mutation';
  deleteComment: { __typename: 'MessageResponse'; message: string };
};

export type LikeOrUnlikeCommentMutationVariables = Exact<{
  input: CreatePostOrCommentLikeInput;
}>;

export type LikeOrUnlikeCommentMutation = {
  __typename?: 'Mutation';
  likeOrUnlikeComment: { __typename: 'MessageResponse'; message: string };
};

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;

export type UpdateCommentMutation = {
  __typename?: 'Mutation';
  updateComment: { __typename: 'MessageResponse'; message: string };
};

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

export type LikeOrUnlikePostMutationVariables = Exact<{
  createLikeOrUnlike: CreatePostOrCommentLikeInput;
}>;

export type LikeOrUnlikePostMutation = {
  __typename?: 'Mutation';
  likeOrUnlikePost: { __typename?: 'MessageResponse'; message: string };
};

export type MarkNotificationMutationVariables = Exact<{
  input: NotificationCountQueryArgs;
}>;

export type MarkNotificationMutation = {
  __typename?: 'Mutation';
  markNotification: { __typename: 'NotificationResponse'; state: boolean };
};

export type UpdateNotificationMutationVariables = Exact<{
  input: NotificationUpdateArgs;
}>;

export type UpdateNotificationMutation = {
  __typename?: 'Mutation';
  updateNotification: { __typename: 'NotificationResponse'; state: boolean };
};

export type DeletePostMutationVariables = Exact<{
  deletePostInput: DeletePostInput;
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: { __typename?: 'MessageResponse'; message: string };
};

export type CreatePostMutationVariables = Exact<{
  createPost: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: { __typename?: 'MessageResponse'; message: string };
};

export type UpdatePostMutationVariables = Exact<{
  updatePost: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  __typename?: 'Mutation';
  updatePost: { __typename?: 'MessageResponse'; message: string };
};

export type ProfileUpdateMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
  username: Scalars['String']['input'];
}>;

export type ProfileUpdateMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'MessageResponse'; message: string };
};

export type GetCommentsQueryVariables = Exact<{
  query: CommentsQueryArgs;
  option: PaginateOptionArgs;
}>;

export type GetCommentsQuery = {
  __typename?: 'Query';
  getComments?: {
    __typename: 'CommentPagination';
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
    pagingCounter: number;
    docs?: Array<{
      __typename: 'CommentPaginate';
      replyCount: number;
      id?: string | null;
      post_id?: string | null;
      body?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      isPostOwner: boolean;
      isOwnComment: boolean;
      isEdited?: boolean | null;
      isLiked?: boolean | null;
      depth: number;
      likesCount: number;
      author: {
        __typename?: 'CommentAuthor';
        id?: string | null;
        username: string;
        avatar?: {
          __typename: 'AvatarImage';
          avatarUrl?: string | null;
          avatarPublicId?: string | null;
        } | null;
      };
    } | null> | null;
  } | null;
};

export type GetRepliesCommentQueryVariables = Exact<{
  query: ReplyQueryArgs;
  option: PaginateOptionArgs;
}>;

export type GetRepliesCommentQuery = {
  __typename?: 'Query';
  getReplies?: {
    __typename: 'CommentPagination';
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
    pagingCounter: number;
    docs?: Array<{
      __typename: 'CommentPaginate';
      replyCount: number;
      id?: string | null;
      post_id?: string | null;
      body?: string | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      isPostOwner: boolean;
      isOwnComment: boolean;
      isEdited?: boolean | null;
      depth: number;
      isLiked?: boolean | null;
      likesCount: number;
      author: {
        __typename?: 'CommentAuthor';
        id?: string | null;
        username: string;
        avatar?: {
          __typename: 'AvatarImage';
          avatarUrl?: string | null;
          avatarPublicId?: string | null;
        } | null;
      };
    } | null> | null;
  } | null;
};

export type GetFeedQueryVariables = Exact<{
  query: NewsFeedQueryArgs;
  option: GetFeedDto;
}>;

export type GetFeedQuery = {
  __typename?: 'Query';
  getFeeds: {
    __typename: 'NewsFeedPagination';
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
    pagingCounter: number;
    prevPage?: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    docs?: Array<{
      __typename?: 'NewsFeedPaginate';
      commentsCount?: number | null;
      content?: string | null;
      createdAt?: any | null;
      id?: string | null;
      isLiked?: boolean | null;
      isOwnPost?: boolean | null;
      likesCount?: number | null;
      updatedAt?: any | null;
      author?: {
        __typename?: 'Author';
        username: string;
        email: string;
        id?: string | null;
        name: string;
        avatar: {
          __typename: 'AvatarImage';
          avatarUrl?: string | null;
          avatarPublicId?: string | null;
        };
      } | null;
      photos?: Array<{
        __typename: 'PhotosImageInfo';
        photosUrl?: string | null;
        photosPublicId?: string | null;
      }> | null;
    } | null> | null;
  };
};

export type GetFollowersQueryVariables = Exact<{
  username: Scalars['String']['input'];
  options: PaginateOptionArgs;
  query: FollowQueryArgs;
}>;

export type GetFollowersQuery = {
  __typename?: 'Query';
  getFollowers: {
    __typename: 'FollowPagination';
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
    pagingCounter: number;
    prevPage?: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    docs?: Array<{
      __typename: 'Pagination';
      email: string;
      id: string;
      isFollowing: boolean;
      name: string;
      username?: string | null;
      contact?: string | null;
      birthday?: any | null;
      bio?: string | null;
      gender?: string | null;
      avatar: {
        __typename?: 'AvatarImage';
        avatarUrl?: string | null;
        avatarPublicId?: string | null;
      };
    } | null> | null;
  };
};

export type GetFollowingQueryVariables = Exact<{
  username: Scalars['String']['input'];
  options: PaginateOptionArgs;
  query: FollowQueryArgs;
}>;

export type GetFollowingQuery = {
  __typename?: 'Query';
  getFollowing: {
    __typename: 'FollowPagination';
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
    pagingCounter: number;
    prevPage?: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    docs?: Array<{
      __typename: 'Pagination';
      email: string;
      id: string;
      isFollowing: boolean;
      name: string;
      username?: string | null;
      contact?: string | null;
      birthday?: any | null;
      bio?: string | null;
      gender?: string | null;
      avatar: {
        __typename?: 'AvatarImage';
        avatarUrl?: string | null;
        avatarPublicId?: string | null;
      };
    } | null> | null;
  };
};

export type GetSuggestionPeopleQueryVariables = Exact<{
  options: PaginateOptionArgs;
  query: FollowQueryArgs;
}>;

export type GetSuggestionPeopleQuery = {
  __typename?: 'Query';
  getSuggestionPeople?: {
    __typename: 'FollowPagination';
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
    pagingCounter: number;
    prevPage?: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    docs?: Array<{
      __typename: 'Pagination';
      email: string;
      id: string;
      isFollowing: boolean;
      name: string;
      username?: string | null;
      avatar: {
        __typename?: 'AvatarImage';
        avatarUrl?: string | null;
        avatarPublicId?: string | null;
      };
    } | null> | null;
  } | null;
};

export type GetNotificationsQueryVariables = Exact<{
  query: NotificationQueryArgs;
  options: PaginateOptionArgs;
}>;

export type GetNotificationsQuery = {
  __typename?: 'Query';
  getNotifications: {
    __typename?: 'NotificationPagination';
    docs?: Array<{
      __typename: 'NotificationPaginate';
      type: NotificationType;
      id: string;
      unread: boolean;
      link: string;
      createdAt: any;
      updatedAt: any;
      target: {
        __typename: 'NotificationUser';
        username: string;
        name: string;
        avatar: {
          __typename?: 'AvatarImage';
          avatarUrl?: string | null;
          avatarPublicId?: string | null;
        };
      };
      initiator: {
        __typename: 'NotificationUser';
        username: string;
        name: string;
        avatar: {
          __typename?: 'AvatarImage';
          avatarUrl?: string | null;
          avatarPublicId?: string | null;
        };
      };
    } | null> | null;
  };
};

export type GetNotificationCountQueryVariables = Exact<{
  query: NotificationCountQueryArgs;
}>;

export type GetNotificationCountQuery = {
  __typename?: 'Query';
  getNotificationCount: { __typename: 'NotificationCount'; count: number };
};

export type GetPostLikesQueryVariables = Exact<{
  query: LikesQueryArgs;
  option: PaginateOptionArgs;
}>;

export type GetPostLikesQuery = {
  __typename?: 'Query';
  getPostLikes: Array<{
    __typename: 'GetLikeResponse';
    isFollowing: boolean;
    name: string;
    username: string;
    _id: string;
    avatar: {
      __typename?: 'AvatarImage';
      avatarUrl?: string | null;
      avatarPublicId?: string | null;
    };
  }>;
};

export type GetPostsQueryVariables = Exact<{
  username: Scalars['String']['input'];
  query: NewsFeedQueryArgs;
  option: GetFeedDto;
}>;

export type GetPostsQuery = {
  __typename?: 'Query';
  getPosts: {
    __typename: 'NewsFeedPagination';
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    page: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
    docs?: Array<{
      __typename?: 'NewsFeedPaginate';
      commentsCount?: number | null;
      content?: string | null;
      createdAt?: any | null;
      id?: string | null;
      isLiked?: boolean | null;
      isOwnPost?: boolean | null;
      likesCount?: number | null;
      updatedAt?: any | null;
      author?: {
        __typename?: 'Author';
        username: string;
        email: string;
        id?: string | null;
        name: string;
        avatar: {
          __typename?: 'AvatarImage';
          avatarUrl?: string | null;
          avatarPublicId?: string | null;
        };
      } | null;
      photos?: Array<{
        __typename: 'PhotosImageInfo';
        photosUrl?: string | null;
        photosPublicId?: string | null;
      }> | null;
    } | null> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'IUser';
    username: string;
    name: string;
    email?: string | null;
    _id: string;
    bio?: string | null;
    birthday?: any | null;
    contact?: string | null;
    gender?: string | null;
    avatar: {
      __typename?: 'AvatarImage';
      avatarUrl?: string | null;
      avatarPublicId?: string | null;
    };
    coverPicture?: {
      __typename?: 'CoverImage';
      coverUrl?: string | null;
      coverPublicId?: string | null;
    } | null;
  };
};

export type SearchUserQueryVariables = Exact<{
  query: SearchDto;
  option: PaginateOptionArgs;
}>;

export type SearchUserQuery = {
  __typename?: 'Query';
  searchUser?: Array<{
    __typename: 'IUser';
    _id: string;
    username: string;
    bio?: string | null;
    birthday?: any | null;
    contact?: string | null;
    email?: string | null;
    gender?: string | null;
    isFollowing: boolean;
    name: string;
    avatar: {
      __typename: 'AvatarImage';
      avatarUrl?: string | null;
      avatarPublicId?: string | null;
    };
    coverPicture?: {
      __typename: 'CoverImage';
      coverUrl?: string | null;
      coverPublicId?: string | null;
    } | null;
  }> | null;
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
    bio?: string | null;
    birthday?: any | null;
    contact?: string | null;
    gender?: string | null;
    email: string;
    followersCount?: number | null;
    followingCount?: number | null;
    id: string;
    isFollowing: boolean;
    isOwnProfile: boolean;
    avatar?: {
      __typename?: 'AvatarImage';
      avatarUrl?: string | null;
      avatarPublicId?: string | null;
    } | null;
    coverPicture?: {
      __typename?: 'CoverImage';
      coverUrl?: string | null;
      coverPublicId?: string | null;
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
export const CreateCommentDocument = /*#__PURE__*/ `
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(createCommentInput: $input) {
    message
    __typename
  }
}
    `;
export const useCreateCommentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateCommentMutation,
    TError,
    CreateCommentMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateCommentMutation,
    TError,
    CreateCommentMutationVariables,
    TContext
  >(
    ['CreateComment'],
    (variables?: CreateCommentMutationVariables) =>
      fetcher<CreateCommentMutation, CreateCommentMutationVariables>(
        CreateCommentDocument,
        variables
      )(),
    options
  );
useCreateCommentMutation.getKey = () => ['CreateComment'];

useCreateCommentMutation.fetcher = (
  variables: CreateCommentMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    variables,
    options
  );
export const ReplyCommentDocument = /*#__PURE__*/ `
    mutation ReplyComment($input: CreateReplyInput!) {
  createCommentReply(createReplyInput: $input) {
    message
    __typename
  }
}
    `;
export const useReplyCommentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ReplyCommentMutation,
    TError,
    ReplyCommentMutationVariables,
    TContext
  >
) =>
  useMutation<
    ReplyCommentMutation,
    TError,
    ReplyCommentMutationVariables,
    TContext
  >(
    ['ReplyComment'],
    (variables?: ReplyCommentMutationVariables) =>
      fetcher<ReplyCommentMutation, ReplyCommentMutationVariables>(
        ReplyCommentDocument,
        variables
      )(),
    options
  );
useReplyCommentMutation.getKey = () => ['ReplyComment'];

useReplyCommentMutation.fetcher = (
  variables: ReplyCommentMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<ReplyCommentMutation, ReplyCommentMutationVariables>(
    ReplyCommentDocument,
    variables,
    options
  );
export const DeleteCommentDocument = /*#__PURE__*/ `
    mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(deleteCommentInput: $input) {
    message
    __typename
  }
}
    `;
export const useDeleteCommentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteCommentMutation,
    TError,
    DeleteCommentMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteCommentMutation,
    TError,
    DeleteCommentMutationVariables,
    TContext
  >(
    ['DeleteComment'],
    (variables?: DeleteCommentMutationVariables) =>
      fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(
        DeleteCommentDocument,
        variables
      )(),
    options
  );
useDeleteCommentMutation.getKey = () => ['DeleteComment'];

useDeleteCommentMutation.fetcher = (
  variables: DeleteCommentMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    variables,
    options
  );
export const LikeOrUnlikeCommentDocument = /*#__PURE__*/ `
    mutation LikeOrUnlikeComment($input: CreatePostOrCommentLikeInput!) {
  likeOrUnlikeComment(likeOrUnlikeCommentInput: $input) {
    message
    __typename
  }
}
    `;
export const useLikeOrUnlikeCommentMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    LikeOrUnlikeCommentMutation,
    TError,
    LikeOrUnlikeCommentMutationVariables,
    TContext
  >
) =>
  useMutation<
    LikeOrUnlikeCommentMutation,
    TError,
    LikeOrUnlikeCommentMutationVariables,
    TContext
  >(
    ['LikeOrUnlikeComment'],
    (variables?: LikeOrUnlikeCommentMutationVariables) =>
      fetcher<
        LikeOrUnlikeCommentMutation,
        LikeOrUnlikeCommentMutationVariables
      >(LikeOrUnlikeCommentDocument, variables)(),
    options
  );
useLikeOrUnlikeCommentMutation.getKey = () => ['LikeOrUnlikeComment'];

useLikeOrUnlikeCommentMutation.fetcher = (
  variables: LikeOrUnlikeCommentMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<LikeOrUnlikeCommentMutation, LikeOrUnlikeCommentMutationVariables>(
    LikeOrUnlikeCommentDocument,
    variables,
    options
  );
export const UpdateCommentDocument = /*#__PURE__*/ `
    mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(updateCommentInput: $input) {
    message
    __typename
  }
}
    `;
export const useUpdateCommentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateCommentMutation,
    TError,
    UpdateCommentMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateCommentMutation,
    TError,
    UpdateCommentMutationVariables,
    TContext
  >(
    ['UpdateComment'],
    (variables?: UpdateCommentMutationVariables) =>
      fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(
        UpdateCommentDocument,
        variables
      )(),
    options
  );
useUpdateCommentMutation.getKey = () => ['UpdateComment'];

useUpdateCommentMutation.fetcher = (
  variables: UpdateCommentMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(
    UpdateCommentDocument,
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
export const LikeOrUnlikePostDocument = /*#__PURE__*/ `
    mutation likeOrUnlikePost($createLikeOrUnlike: CreatePostOrCommentLikeInput!) {
  likeOrUnlikePost(likeOrUnlikePostInput: $createLikeOrUnlike) {
    message
  }
}
    `;
export const useLikeOrUnlikePostMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    LikeOrUnlikePostMutation,
    TError,
    LikeOrUnlikePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    LikeOrUnlikePostMutation,
    TError,
    LikeOrUnlikePostMutationVariables,
    TContext
  >(
    ['likeOrUnlikePost'],
    (variables?: LikeOrUnlikePostMutationVariables) =>
      fetcher<LikeOrUnlikePostMutation, LikeOrUnlikePostMutationVariables>(
        LikeOrUnlikePostDocument,
        variables
      )(),
    options
  );
useLikeOrUnlikePostMutation.getKey = () => ['likeOrUnlikePost'];

useLikeOrUnlikePostMutation.fetcher = (
  variables: LikeOrUnlikePostMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<LikeOrUnlikePostMutation, LikeOrUnlikePostMutationVariables>(
    LikeOrUnlikePostDocument,
    variables,
    options
  );
export const MarkNotificationDocument = /*#__PURE__*/ `
    mutation MarkNotification($input: NotificationCountQueryArgs!) {
  markNotification(markNotificationArgs: $input) {
    state
    __typename
  }
}
    `;
export const useMarkNotificationMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    MarkNotificationMutation,
    TError,
    MarkNotificationMutationVariables,
    TContext
  >
) =>
  useMutation<
    MarkNotificationMutation,
    TError,
    MarkNotificationMutationVariables,
    TContext
  >(
    ['MarkNotification'],
    (variables?: MarkNotificationMutationVariables) =>
      fetcher<MarkNotificationMutation, MarkNotificationMutationVariables>(
        MarkNotificationDocument,
        variables
      )(),
    options
  );
useMarkNotificationMutation.getKey = () => ['MarkNotification'];

useMarkNotificationMutation.fetcher = (
  variables: MarkNotificationMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<MarkNotificationMutation, MarkNotificationMutationVariables>(
    MarkNotificationDocument,
    variables,
    options
  );
export const UpdateNotificationDocument = /*#__PURE__*/ `
    mutation UpdateNotification($input: NotificationUpdateArgs!) {
  updateNotification(updateNotificationArgs: $input) {
    state
    __typename
  }
}
    `;
export const useUpdateNotificationMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    UpdateNotificationMutation,
    TError,
    UpdateNotificationMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateNotificationMutation,
    TError,
    UpdateNotificationMutationVariables,
    TContext
  >(
    ['UpdateNotification'],
    (variables?: UpdateNotificationMutationVariables) =>
      fetcher<UpdateNotificationMutation, UpdateNotificationMutationVariables>(
        UpdateNotificationDocument,
        variables
      )(),
    options
  );
useUpdateNotificationMutation.getKey = () => ['UpdateNotification'];

useUpdateNotificationMutation.fetcher = (
  variables: UpdateNotificationMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<UpdateNotificationMutation, UpdateNotificationMutationVariables>(
    UpdateNotificationDocument,
    variables,
    options
  );
export const DeletePostDocument = /*#__PURE__*/ `
    mutation DeletePost($deletePostInput: DeletePostInput!) {
  deletePost(deletePostInput: $deletePostInput) {
    message
  }
}
    `;
export const useDeletePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >(
    ['DeletePost'],
    (variables?: DeletePostMutationVariables) =>
      fetcher<DeletePostMutation, DeletePostMutationVariables>(
        DeletePostDocument,
        variables
      )(),
    options
  );
useDeletePostMutation.getKey = () => ['DeletePost'];

useDeletePostMutation.fetcher = (
  variables: DeletePostMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    variables,
    options
  );
export const CreatePostDocument = /*#__PURE__*/ `
    mutation CreatePost($createPost: CreatePostInput!) {
  createPost(createPostInput: $createPost) {
    message
  }
}
    `;
export const useCreatePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >(
    ['CreatePost'],
    (variables?: CreatePostMutationVariables) =>
      fetcher<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        variables
      )(),
    options
  );
useCreatePostMutation.getKey = () => ['CreatePost'];

useCreatePostMutation.fetcher = (
  variables: CreatePostMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    variables,
    options
  );
export const UpdatePostDocument = /*#__PURE__*/ `
    mutation UpdatePost($updatePost: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePost) {
    message
  }
}
    `;
export const useUpdatePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdatePostMutation,
    TError,
    UpdatePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdatePostMutation,
    TError,
    UpdatePostMutationVariables,
    TContext
  >(
    ['UpdatePost'],
    (variables?: UpdatePostMutationVariables) =>
      fetcher<UpdatePostMutation, UpdatePostMutationVariables>(
        UpdatePostDocument,
        variables
      )(),
    options
  );
useUpdatePostMutation.getKey = () => ['UpdatePost'];

useUpdatePostMutation.fetcher = (
  variables: UpdatePostMutationVariables,
  options?: RequestInit['headers']
) =>
  fetcher<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    variables,
    options
  );
export const ProfileUpdateDocument = /*#__PURE__*/ `
    mutation profileUpdate($updateUserInput: UpdateUserInput!, $username: String!) {
  updateUser(input: $updateUserInput, username: $username) {
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
export const GetCommentsDocument = /*#__PURE__*/ `
    query GetComments($query: CommentsQueryArgs!, $option: PaginateOptionArgs!) {
  getComments(query: $query, option: $option) {
    docs {
      replyCount
      id
      post_id
      __typename
      body
      createdAt
      updatedAt
      isPostOwner
      isOwnComment
      isEdited
      isLiked
      depth
      likesCount
      author {
        id
        username
        avatar {
          avatarUrl
          avatarPublicId
          __typename
        }
      }
    }
    __typename
    totalDocs
    limit
    page
    totalPages
    hasNextPage
    hasPrevPage
    nextPage
    prevPage
    pagingCounter
  }
}
    `;
export const useGetCommentsQuery = <TData = GetCommentsQuery, TError = unknown>(
  variables: GetCommentsQueryVariables,
  options?: UseQueryOptions<GetCommentsQuery, TError, TData>
) =>
  useQuery<GetCommentsQuery, TError, TData>(
    ['GetComments', variables],
    fetcher<GetCommentsQuery, GetCommentsQueryVariables>(
      GetCommentsDocument,
      variables
    ),
    options
  );

useGetCommentsQuery.getKey = (variables: GetCommentsQueryVariables) => [
  'GetComments',
  variables,
];
useGetCommentsQuery.fetcher = (
  variables: GetCommentsQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    variables,
    options
  );
export const GetRepliesCommentDocument = /*#__PURE__*/ `
    query GetRepliesComment($query: ReplyQueryArgs!, $option: PaginateOptionArgs!) {
  getReplies(query: $query, option: $option) {
    docs {
      replyCount
      id
      post_id
      __typename
      body
      createdAt
      updatedAt
      isPostOwner
      isOwnComment
      isEdited
      depth
      isLiked
      likesCount
      author {
        id
        username
        avatar {
          avatarUrl
          avatarPublicId
          __typename
        }
      }
    }
    __typename
    totalDocs
    limit
    page
    totalPages
    hasNextPage
    hasPrevPage
    nextPage
    prevPage
    pagingCounter
  }
}
    `;
export const useGetRepliesCommentQuery = <
  TData = GetRepliesCommentQuery,
  TError = unknown
>(
  variables: GetRepliesCommentQueryVariables,
  options?: UseQueryOptions<GetRepliesCommentQuery, TError, TData>
) =>
  useQuery<GetRepliesCommentQuery, TError, TData>(
    ['GetRepliesComment', variables],
    fetcher<GetRepliesCommentQuery, GetRepliesCommentQueryVariables>(
      GetRepliesCommentDocument,
      variables
    ),
    options
  );

useGetRepliesCommentQuery.getKey = (
  variables: GetRepliesCommentQueryVariables
) => ['GetRepliesComment', variables];
useGetRepliesCommentQuery.fetcher = (
  variables: GetRepliesCommentQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetRepliesCommentQuery, GetRepliesCommentQueryVariables>(
    GetRepliesCommentDocument,
    variables,
    options
  );
export const GetFeedDocument = /*#__PURE__*/ `
    query GetFeed($query: NewsFeedQueryArgs!, $option: GetFeedDto!) {
  getFeeds(query: $query, option: $option) {
    docs {
      author {
        avatar {
          avatarUrl
          avatarPublicId
          __typename
        }
        username
        email
        id
        name
      }
      commentsCount
      content
      createdAt
      id
      isLiked
      isOwnPost
      likesCount
      photos {
        photosUrl
        photosPublicId
        __typename
      }
      updatedAt
    }
    __typename
    limit
    page
    totalDocs
    totalPages
    pagingCounter
    prevPage
    hasNextPage
    hasPrevPage
    nextPage
  }
}
    `;
export const useGetFeedQuery = <TData = GetFeedQuery, TError = unknown>(
  variables: GetFeedQueryVariables,
  options?: UseQueryOptions<GetFeedQuery, TError, TData>
) =>
  useQuery<GetFeedQuery, TError, TData>(
    ['GetFeed', variables],
    fetcher<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, variables),
    options
  );

useGetFeedQuery.getKey = (variables: GetFeedQueryVariables) => [
  'GetFeed',
  variables,
];
useGetFeedQuery.fetcher = (
  variables: GetFeedQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetFeedQuery, GetFeedQueryVariables>(
    GetFeedDocument,
    variables,
    options
  );
export const GetFollowersDocument = /*#__PURE__*/ `
    query GetFollowers($username: String!, $options: PaginateOptionArgs!, $query: FollowQueryArgs!) {
  getFollowers(username: $username, option: $options, query: $query) {
    docs {
      avatar {
        avatarUrl
        avatarPublicId
      }
      email
      id
      isFollowing
      name
      username
      contact
      birthday
      bio
      gender
      __typename
    }
    __typename
    limit
    page
    totalDocs
    totalPages
    pagingCounter
    prevPage
    hasNextPage
    hasPrevPage
    nextPage
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
    query GetFollowing($username: String!, $options: PaginateOptionArgs!, $query: FollowQueryArgs!) {
  getFollowing(username: $username, option: $options, query: $query) {
    docs {
      avatar {
        avatarUrl
        avatarPublicId
      }
      email
      id
      isFollowing
      name
      username
      contact
      birthday
      bio
      gender
      __typename
    }
    __typename
    limit
    page
    totalDocs
    totalPages
    pagingCounter
    prevPage
    hasNextPage
    hasPrevPage
    nextPage
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
      avatar {
        avatarUrl
        avatarPublicId
      }
      email
      id
      isFollowing
      name
      username
      __typename
    }
    __typename
    limit
    page
    totalDocs
    totalPages
    pagingCounter
    prevPage
    hasNextPage
    hasPrevPage
    nextPage
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
export const GetNotificationsDocument = /*#__PURE__*/ `
    query GetNotifications($query: NotificationQueryArgs!, $options: PaginateOptionArgs!) {
  getNotifications(query: $query, options: $options) {
    docs {
      type
      id
      target {
        username
        avatar {
          avatarUrl
          avatarPublicId
        }
        name
        __typename
      }
      initiator {
        username
        avatar {
          avatarUrl
          avatarPublicId
        }
        name
        __typename
      }
      unread
      link
      createdAt
      updatedAt
      __typename
    }
  }
}
    `;
export const useGetNotificationsQuery = <
  TData = GetNotificationsQuery,
  TError = unknown
>(
  variables: GetNotificationsQueryVariables,
  options?: UseQueryOptions<GetNotificationsQuery, TError, TData>
) =>
  useQuery<GetNotificationsQuery, TError, TData>(
    ['GetNotifications', variables],
    fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
      GetNotificationsDocument,
      variables
    ),
    options
  );

useGetNotificationsQuery.getKey = (
  variables: GetNotificationsQueryVariables
) => ['GetNotifications', variables];
useGetNotificationsQuery.fetcher = (
  variables: GetNotificationsQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    variables,
    options
  );
export const GetNotificationCountDocument = /*#__PURE__*/ `
    query GetNotificationCount($query: NotificationCountQueryArgs!) {
  getNotificationCount(query: $query) {
    count
    __typename
  }
}
    `;
export const useGetNotificationCountQuery = <
  TData = GetNotificationCountQuery,
  TError = unknown
>(
  variables: GetNotificationCountQueryVariables,
  options?: UseQueryOptions<GetNotificationCountQuery, TError, TData>
) =>
  useQuery<GetNotificationCountQuery, TError, TData>(
    ['GetNotificationCount', variables],
    fetcher<GetNotificationCountQuery, GetNotificationCountQueryVariables>(
      GetNotificationCountDocument,
      variables
    ),
    options
  );

useGetNotificationCountQuery.getKey = (
  variables: GetNotificationCountQueryVariables
) => ['GetNotificationCount', variables];
useGetNotificationCountQuery.fetcher = (
  variables: GetNotificationCountQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetNotificationCountQuery, GetNotificationCountQueryVariables>(
    GetNotificationCountDocument,
    variables,
    options
  );
export const GetPostLikesDocument = /*#__PURE__*/ `
    query GetPostLikes($query: LikesQueryArgs!, $option: PaginateOptionArgs!) {
  getPostLikes(query: $query, option: $option) {
    avatar {
      avatarUrl
      avatarPublicId
    }
    isFollowing
    name
    username
    _id
    __typename
  }
}
    `;
export const useGetPostLikesQuery = <
  TData = GetPostLikesQuery,
  TError = unknown
>(
  variables: GetPostLikesQueryVariables,
  options?: UseQueryOptions<GetPostLikesQuery, TError, TData>
) =>
  useQuery<GetPostLikesQuery, TError, TData>(
    ['GetPostLikes', variables],
    fetcher<GetPostLikesQuery, GetPostLikesQueryVariables>(
      GetPostLikesDocument,
      variables
    ),
    options
  );

useGetPostLikesQuery.getKey = (variables: GetPostLikesQueryVariables) => [
  'GetPostLikes',
  variables,
];
useGetPostLikesQuery.fetcher = (
  variables: GetPostLikesQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetPostLikesQuery, GetPostLikesQueryVariables>(
    GetPostLikesDocument,
    variables,
    options
  );
export const GetPostsDocument = /*#__PURE__*/ `
    query GetPosts($username: String!, $query: NewsFeedQueryArgs!, $option: GetFeedDto!) {
  getPosts(username: $username, query: $query, option: $option) {
    docs {
      author {
        avatar {
          avatarUrl
          avatarPublicId
        }
        username
        email
        id
        name
      }
      commentsCount
      content
      createdAt
      id
      isLiked
      isOwnPost
      likesCount
      photos {
        photosUrl
        photosPublicId
        __typename
      }
      updatedAt
    }
    __typename
    hasNextPage
    hasPrevPage
    limit
    nextPage
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
  }
}
    `;
export const useGetPostsQuery = <TData = GetPostsQuery, TError = unknown>(
  variables: GetPostsQueryVariables,
  options?: UseQueryOptions<GetPostsQuery, TError, TData>
) =>
  useQuery<GetPostsQuery, TError, TData>(
    ['GetPosts', variables],
    fetcher<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables),
    options
  );

useGetPostsQuery.getKey = (variables: GetPostsQueryVariables) => [
  'GetPosts',
  variables,
];
useGetPostsQuery.fetcher = (
  variables: GetPostsQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    variables,
    options
  );
export const MeDocument = /*#__PURE__*/ `
    query me {
  me {
    avatar {
      avatarUrl
      avatarPublicId
    }
    username
    name
    email
    coverPicture {
      coverUrl
      coverPublicId
    }
    _id
    bio
    birthday
    contact
    gender
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
export const SearchUserDocument = /*#__PURE__*/ `
    query searchUser($query: SearchDto!, $option: PaginateOptionArgs!) {
  searchUser(query: $query, option: $option) {
    _id
    username
    avatar {
      avatarUrl
      avatarPublicId
      __typename
    }
    bio
    birthday
    contact
    coverPicture {
      coverUrl
      coverPublicId
      __typename
    }
    email
    gender
    isFollowing
    name
    __typename
  }
}
    `;
export const useSearchUserQuery = <TData = SearchUserQuery, TError = unknown>(
  variables: SearchUserQueryVariables,
  options?: UseQueryOptions<SearchUserQuery, TError, TData>
) =>
  useQuery<SearchUserQuery, TError, TData>(
    ['searchUser', variables],
    fetcher<SearchUserQuery, SearchUserQueryVariables>(
      SearchUserDocument,
      variables
    ),
    options
  );

useSearchUserQuery.getKey = (variables: SearchUserQueryVariables) => [
  'searchUser',
  variables,
];
useSearchUserQuery.fetcher = (
  variables: SearchUserQueryVariables,
  options?: RequestInit['headers']
) =>
  fetcher<SearchUserQuery, SearchUserQueryVariables>(
    SearchUserDocument,
    variables,
    options
  );
export const UserProfileDocument = /*#__PURE__*/ `
    query UserProfile($username: String!) {
  user(username: $username) {
    username
    name
    avatar {
      avatarUrl
      avatarPublicId
    }
    coverPicture {
      coverUrl
      coverPublicId
    }
    bio
    birthday
    contact
    gender
    name
    email
    followersCount
    followingCount
    id
    isFollowing
    isOwnProfile
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
