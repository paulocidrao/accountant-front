import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

const tokenValue = cookies.get("Token");
export const deleteUser = async (id: string) => {
  const result = await api.delete(`user/delete/${id}`, {
    body: JSON.stringify(null),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
