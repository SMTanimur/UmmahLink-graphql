
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import UserComponent from './user-component';



type Params = {
  params: {
    username: string;
    type: string;
  };
};


// META DATA
// import type { Metadata } from "next";
// import { useUserProfile } from '~ui';
// /** @type {import("next").Metadata} */

// export async function  generateMetadata({
//   params,
// }: Params): Promise<Metadata>  {
  
//   const {data}=useUserProfile(params.username)
//   return {
//     title: "My Account | " + data?.user?.username,
//     description: "My account page",
//   };
// }



function ProfilePage({ params: { username, type } }: Params) {

  return (
    <>
    <UserComponent type={type} username={username} />;
    </>
    )

}

export default ProfilePage;





