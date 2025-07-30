import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

export interface IUpdateUser {
  email: string;
  phone: string;
}

export const updateUser = async (id: string, data: IUpdateUser) => {
  const tokenValue = cookies.get("Token");
  const result = await api.put(`user/update/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
