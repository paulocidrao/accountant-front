import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

export interface associateSecretaryRequest {
  secretaryEmail: string;
  companyEmail: string;
}

const tokenValue = cookies.get("Token");

export const associateSecretary = async (data: associateSecretaryRequest) => {
  const result = await api.put("user/secretary/associate", {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
