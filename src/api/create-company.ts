import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

export interface IcreateCompany {
  name: string;
  document: string;
  phone: string;
  email: string;
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
export const createCompany = async (data: IcreateCompany) => {
  const result = await api.post("company/create", {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
