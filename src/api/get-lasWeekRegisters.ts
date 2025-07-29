import { cookies } from "@/lib/cookies";
import { api } from "./api-client";
import type { IGetAllRegistersResponse } from "./get-allRegisters";

export const getLastWeekRegisters = async () => {
  const tokenValue = await cookies.get("Token");
  const result = await api
    .get("bill/list/lastWeek", {
      headers: {
        Authorization: `Bearer ${tokenValue.token}`,
      },
    })
    .json<IGetAllRegistersResponse[]>();
  return result;
};
