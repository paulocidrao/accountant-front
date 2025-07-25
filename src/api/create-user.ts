import type { createUserForm } from "@/validators/createUserForm";
import { api } from "./api-client";
import { cookies } from "@/lib/cookies";

export const createUser = async (data: createUserForm) => {
  const tokenValue = await cookies.get("Token");
  const result = await api.post("user", {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
