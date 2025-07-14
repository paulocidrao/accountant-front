import type { CEPResponse } from "@/@types/cepType";
import { cepApi } from "./api-client";

export const getCep = async (cep: string) => {
  const result = await cepApi.get(`${cep}/json/`).json<CEPResponse>();

  return result;
};
