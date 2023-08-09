
import React from 'react';




type Params = {
  params: {
    type: string;
  };
};


// META DATA
import type { Metadata } from "next";
import { Notification } from '~ui';

/** @type {import("next").Metadata} */

export async function  generateMetadata({
  params,
}: Params): Promise<Metadata>  {
  
  
  return {
    title: "Notification | " + params.type,
    description: "My account page",
  };
}



function ProfilePage({ params: {  type } }: Params) {

  return (
    <>
    <Notification type={type}  />;
    </>
    )

}

export default ProfilePage;



