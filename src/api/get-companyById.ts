import { cookies } from "@/lib/cookies";
import { api } from "./api-client";

const tokenValue = cookies.get("Token");

export interface IGetCompanyIdResponse {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  address: {
    zipcode: string;
    street: string;
    state: string;
    complement: string;
    city: string;
    number: string;
  };
}

export const getCompanyById = async (id: string) => {
  const result = await api
    .get(`company/list/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenValue.token}`,
      },
    })
    .json<IGetCompanyIdResponse>();

  return result;
};
