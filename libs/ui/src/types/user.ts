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


export interface MarkupLinkProps {
  href?: string;
  title?: string;
}


export interface Size {
  width: number;
  height: number;
}

export interface MediaSize {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}
