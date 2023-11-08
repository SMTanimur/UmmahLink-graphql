
import { SessionKey } from "@social-zone/graphql";
import { atom } from "jotai";
import Cookies from "js-cookie";

export function checkIsLoggedIn() {
  const token = Cookies.get(SessionKey as string);
  if (!token) return false;
  return true;
}
export const authorizationAtom = atom(checkIsLoggedIn());
