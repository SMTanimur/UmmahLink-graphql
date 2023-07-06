"use client"

import { Metadata } from "next";

import WithoutUser from "./home/WithoutUser";
import { useAuth, useGetSuggestionQuery } from "~ui";
import Home from "./Home-component";


const HomePage = () => {

  const {isAuthenticated}=useAuth()
  const {data}=useGetSuggestionQuery()

  if( !(isAuthenticated)) return <WithoutUser/>

   
   return <Home/>
};

export default HomePage;
export const metadata: Metadata = {
  title: 'Home'
}
