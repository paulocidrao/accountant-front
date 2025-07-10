import type { createUserForm } from "@/validators/createUserForm";
import { api } from "./api-client";
import { cookies } from "@/lib/cookies";

const tokenValue = cookies.get("Token");
export const createUser = async (data: createUserForm) => {
  const result = await api.post("user", {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
