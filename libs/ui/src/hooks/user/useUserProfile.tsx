
import {  useUserProfileQuery } from '@social-zone/graphql';


export const useUserProfile = (username:string) => {
 return useUserProfileQuery({username})
};
