export interface IUser {
  id: string;
  username: string;
  fullname: string;
  email: string;
  profilePicture?: string | Record<string, any>;
  isEmailValidated: boolean;
  [prop: string]: any;
}