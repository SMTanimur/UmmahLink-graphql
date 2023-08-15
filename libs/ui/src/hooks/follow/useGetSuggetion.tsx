"use client"
import {  useGetSuggestionPeopleQuery } from "@social-zone/graphql";



export const useGetSuggestionQuery = () => {
 
  return useGetSuggestionPeopleQuery({options:{limit:999},query:{}})
};
