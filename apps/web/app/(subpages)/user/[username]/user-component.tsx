"use client"

import { useUserProfileQuery } from "@social-zone/graphql";
import { useState } from "react";
import { ProfilePostType } from "~ui";

type UserComponentProps = {
   username: string;
    type: string;
}
export default function UserComponent( { username,type } : UserComponentProps) {

  const {data}= useUserProfileQuery({username})

  const [postType, setPostType] = useState(
    type &&
      ['posts', 'info', 'friends'].includes(type as string)
      ? type.toString().toUpperCase()
      : ProfilePostType.Post
  );
  return <div className="text-5xl container">{username}</div>;
}