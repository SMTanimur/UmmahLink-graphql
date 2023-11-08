
import { SessionKey } from "@social-zone/graphql";
import Cookies from "js-cookie";

export function useToken() {
  return {
    setToken(token: string) {
      Cookies.set(SessionKey as string, token, { expires: 7 });
    },
    getToken() {
      return Cookies.get(SessionKey as string);
    },
    removeToken() {
      Cookies.remove(SessionKey as string);
    },
    hasToken() {
      const token = Cookies.get(SessionKey as string);
      if (!token) return false;
      return true;
    },
  };
}
