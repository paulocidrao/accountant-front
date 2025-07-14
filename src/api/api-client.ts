import ky from "ky";

export const api = ky.extend({
  prefixUrl: "http://localhost:8081",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const cepApi = ky.extend({
  prefixUrl: "https://viacep.com.br/ws",
});
