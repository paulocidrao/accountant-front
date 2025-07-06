import type { loginForm } from "@/validators/loginForm";
import { api } from "./api-client";
import { Cookies } from "react-cookie";
export const login = async (data: loginForm) => {
  const cookies = new Cookies();

  const result = await api.post("user/login", {
    body: JSON.stringify(data),
  });

  const response = await result.json<string>();
  cookies.set("Token", response, {
    path: "/",
  });
};
