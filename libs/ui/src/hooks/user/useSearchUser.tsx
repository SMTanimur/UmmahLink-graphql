
"use client"

import { useSearchUserQuery } from "@social-zone/graphql";

export const useSearchUserProfile = (keyword:string) => {
  return useSearchUserQuery({option:{limit:5},query:{keyword}})
 };