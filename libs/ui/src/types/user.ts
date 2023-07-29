export interface ICurrentUser {
  _id: string;
  email: string;
  fullName: string;
  username:string
  avatar: string;
  roles: string[];
}


export enum ProfilePostType {
  FEED = 'FEED',
  Info = 'INFO',
  Followers = 'FOLLOWERS',
  Following = 'FOLLOWING',
  
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

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IFileHandler<T> {
  imageFile: T,
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>, callback?: (file?: IImage) => void) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}

