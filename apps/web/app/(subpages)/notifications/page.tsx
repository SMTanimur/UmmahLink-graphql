
import React from 'react';




type Params = {
  params: {
    type: string;
  };
};


// META DATA
import type { Metadata } from "next";
import Notification from './NotificationComponent';



/** @type {import("next").Metadata} */

export async function  generateMetadata({
  params,
}: Params): Promise<Metadata>  {
  
  
  return {
    title: "Notification ",
    description: "My account page",
  };
}



function NotificationPage({ params: {  type } }: Params) {


  return (
    <>
    <Notification type={type}  />;
    </>
    )

}

export default NotificationPage



