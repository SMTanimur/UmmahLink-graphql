import { ICurrentUser } from "../types";



export const LocalStorage = {
  currentUser: 'currentUser',
};

export const isBrowser = typeof window !== 'undefined';

export const getCurrentUserLocalStorage: () => ICurrentUser | null = () => {
  if (isBrowser)
      return localStorage.getItem(LocalStorage.currentUser)
          ? JSON.parse(localStorage.getItem(LocalStorage.currentUser) || '')
          : null;
};

export const removeCurrentUserLocalStorage = () => {
  localStorage.removeItem(LocalStorage.currentUser);
};

export const setCurrentUserLocalStorage = (user: Partial<ICurrentUser> | null) => {
  const currentUser = getCurrentUserLocalStorage();
  const newCurrentUser = { ...currentUser, ...user };
  if (isBrowser) localStorage.setItem(LocalStorage.currentUser, JSON.stringify(newCurrentUser));
};

export const convertHttps = (url?: string) => {
  if (!url) return '';

  if (url.startsWith('http://')) {
    return 'https' + url.substring(4);
  }

  return url;
}