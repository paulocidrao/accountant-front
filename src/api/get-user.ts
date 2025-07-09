import { cookies } from "@/lib/cookies";
import { api } from "./api-client";
export interface IGetUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "adm" | "counselor" | "secretary";
}
const tokenValue = cookies.get("Token");

export const getUser = async () => {
  const result = await api
    .get("user/me", {
      headers: {
        Authorization: `Bearer ${tokenValue.token}`,
      },
    })
    .json<IGetUser>();
  return result;
};
