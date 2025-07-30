import { env } from "@/env";
import ky from "ky";

export const api = ky.extend({
  prefixUrl: env.VITE_API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const cepApi = ky.extend({
  prefixUrl: "https://viacep.com.br/ws",
});
