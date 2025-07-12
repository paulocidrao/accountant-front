import { cookies } from "@/lib/cookies";
import { api } from "./api-client";
const tokenValue = cookies.get("Token");

export const associateUser = async (email: string) => {
  const result = await api.put("user/associate", {
    body: JSON.stringify({ email }),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });

  return result;
};
