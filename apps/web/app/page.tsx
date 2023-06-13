"use client"

import { useMeQuery } from "@social-zone/graphql";
import { Metadata } from "next";
import Link from "next/link";
import WithoutUser from "./home/WithoutUser";


const HomePage = () => {

  const {data}=useMeQuery()
  return (
     <>
     <WithoutUser/>
     </>
  )
};

export default HomePage;
export const metadata: Metadata = {
  title: 'Home'
}
