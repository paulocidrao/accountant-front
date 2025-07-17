import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

export interface IupdateCompany {
  phone: string;
  address: {
    zipcode: string;
    street: string;
    state: string;
    complement: string | null;
    city: string;
    number: string;
  };
}

const tokenValue = cookies.get("Token");
export const updateCompany = async (id: string, data: IupdateCompany) => {
  const result = await api.put(`company/update/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
