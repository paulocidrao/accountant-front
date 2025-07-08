import type { payload } from "@/@types/jwtPaylod";
import { cookies } from "@/lib/cookies";
import { jwtDecode } from "jwt-decode";

export const TokenIngo = () => {
  const tokenData = cookies.get("Token");
  if (tokenData && typeof tokenData === "object" && "token" in tokenData) {
    const actualTokenString = tokenData.token;
    const paylod = jwtDecode<payload>(actualTokenString);
    return paylod;
  }
};
