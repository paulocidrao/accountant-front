import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

export const deleteUser = async (id: string) => {
  const tokenValue = await cookies.get("Token");
  const result = await api.delete(`user/delete/${id}`, {
    body: JSON.stringify(null),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
