import type { payload } from "@/@types/jwtPaylod";
import { cookies } from "@/lib/cookies";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const TokenIsValid = () => {
  const tokenData = cookies.get("Token");
  if (!tokenData) {
    return { isTokenValid: false };
  }
  const currentTime = Date.now() / 1000;
  if (tokenData && typeof tokenData === "object" && "token" in tokenData) {
    const actualTokenString = tokenData.token;
    const payload = jwtDecode<payload>(actualTokenString);
    const isTokenValid = payload.exp > currentTime;
    return { isTokenValid };
  }
};

export const transformDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};
