import { cookies } from "@/lib/cookies";
import { api } from "./api-client";
export interface IGetUser {
  id: string;
  companyId: string;
  email: string;
  name: string;
  phone: string;
  role: "adm" | "counselor" | "secretary";
}

export const getUser = async () => {
  const tokenValue = await cookies.get("Token");
  const result = await api
    .get("user/me", {
      headers: {
        Authorization: `Bearer ${tokenValue.token}`,
      },
    })
    .json<IGetUser>();
  return result;
};
