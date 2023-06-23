export interface ICurrentUser {
  _id: string;
  email: string;
  fullName: string;
  username:string
  avatar: string;
  roles: string[];
}


export enum ProfilePostType {
  Post = 'POSTS',
  Info = 'INFO',
  Friend = 'FRIENDS'
  
}