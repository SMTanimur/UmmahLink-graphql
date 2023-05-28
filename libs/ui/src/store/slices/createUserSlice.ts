

import { StateCreator } from 'zustand';
import { IUser } from '../../types';


export interface UserSlice {
  currentUser:any
  setCurrentUser:(currentUser:IUser)=> void
  // friendRequests: IFriendRequest[];
 
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  currentUser:null,
  friendRequests: [],
  
  setCurrentUser(currentUser:IUser) {
     set({currentUser})
    // user.postNotifications = action.payload.postNotifications.filter(
    //   (p: IPostNotification) => p.user._id !== state.user._id
    // );
   
  },
});
