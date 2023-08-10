import { useGetPostLikesQuery } from "@social-zone/graphql"


export const useGetPostLikes = (postId:string,initOffset:number) => {
   const {data,isLoading,error,isFetching}=useGetPostLikesQuery({option:{offset:initOffset,limit:15},query:{postId}})

   return {
    likes:data?.getPostLikes,
    isLoading,
    error,
    isFetching
    
   }
}