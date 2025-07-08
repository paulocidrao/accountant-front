import { cookies } from "@/lib/cookies";
import ky from "ky";
export const api = ky.extend({
  prefixUrl: "http://localhost:8081",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = cookies.get("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
