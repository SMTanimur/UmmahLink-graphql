"use client"
import { useGetFollowersQuery } from "@social-zone/graphql"



export const useGetFollowers = (username:string) => {
  const {data,isLoading,isFetching,error}=useGetFollowersQuery({username:username,options:{limit:10},query:{}})

  return {
    Followers:data?.getFollowers,
    isLoading,
    error,
    isFetching
  }
}