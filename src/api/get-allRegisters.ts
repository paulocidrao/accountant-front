import { api } from "./api-client";
import { cookies } from "@/lib/cookies";
export interface IGetAllRegistersResponse {
  id: string;
  name: string;
  description: string;
  counselorName: string;
  moneys: Array<{
    type: "Nota" | "Moeda";
    quantity: number;
    value: number;
    denomination: string;
  }>;
}
export const getAllRegisters = async () => {
  const tokenValue = await cookies.get("Token");
  const result = await api
    .get("bill/list", {
      headers: {
        Authorization: `Bearer ${tokenValue.token}`,
      },
    })
    .json<IGetAllRegistersResponse[]>();
  return result;
};
