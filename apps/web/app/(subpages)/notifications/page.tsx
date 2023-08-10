
import React from 'react';




type Params = {
  params: {
    type: string;
  };
};


// META DATA
import type { Metadata } from "next";
import { Notifications } from '~ui';


/** @type {import("next").Metadata} */

export async function  generateMetadata({
  params,
}: Params): Promise<Metadata>  {
  
  
  return {
    title: "Notification ",
    description: "My account page",
  };
}



function ProfilePage({ params: {  type } }: Params) {

  return (
    <>
    <Notifications type={type}  />;
    </>
    )

}

export default ProfilePage;



