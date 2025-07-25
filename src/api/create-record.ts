import type { MoneyType } from "@/@types/moneyArray";
import { api } from "./api-client";
import { cookies } from "@/lib/cookies";
export interface ICreateRecords {
  moneys: MoneyType[];
  name: string;
  description: string;
}
export const createRecords = async (data: ICreateRecords) => {
  const tokenValue = await cookies.get("Token");
  const result = await api.post("bill/create", {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${tokenValue.token}`,
    },
  });
  return result;
};
