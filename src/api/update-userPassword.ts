import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

interface IUpdateUserPassword {
  newPassword: string;
  email: string;
}

export const updateUserPassword = async (data: IUpdateUserPassword) => {
  const tokenValue = cookies.get("Token");
  const result = await api.put("user/update/password", {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
