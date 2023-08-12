
import React from 'react';


type Params = {
  searchParams: {
    q: string;
    type: string;
  };
};


// META DATA
import type { Metadata } from "next";
import SearchComponent from './components/SearchComponent';

/** @type {import("next").Metadata} */

export async function  generateMetadata({
  searchParams,
}: Params): Promise<Metadata>  {
  
  
  return {
    title: "Search | " + searchParams.q + " | " + searchParams.type ,
    description: "My account page",
  };
}



function ProfilePage({ searchParams: { q,type } }: Params) {
  return (
    <>
    <SearchComponent type={type} query={q} />;
    </>
    )

}

export default ProfilePage;