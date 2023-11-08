/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import  Cookies from "js-cookie";
import { SessionKey } from "../constants";
const token = Cookies.get(SessionKey as string);
export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): (() => Promise<TData>) => {
  
  return async () => {
    const res = await fetch(process.env["NEXT_PUBLIC_API_BASE_ENDPOINT"] + '/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token : ""}`,
        ...options,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || 'Error…');
    }

    return json.data;
  };
};
