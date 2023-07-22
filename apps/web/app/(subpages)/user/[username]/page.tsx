
import React from 'react';
import UserComponent from './user-component';



type Params = {
  params: {
    username: string;
    type: string;
  };
};


// META DATA
import type { Metadata } from "next";

/** @type {import("next").Metadata} */

export async function  generateMetadata({
  params,
}: Params): Promise<Metadata>  {
  
  
  return {
    title: "My Account | " + params.username,
    description: "My account page",
  };
}



function ProfilePage({ params: { username, type } }: Params) {

  return (
    <>
    <UserComponent type={type} username={username} />;
    </>
    )

}

export default ProfilePage;





