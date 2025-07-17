import { cookies } from "@/lib/cookies";
import { useNavigate } from "react-router";

export const useLogOut = () => {
  const navigate = useNavigate();

  const logout = () => {
    cookies.remove("Token");
    navigate("/auth/sign-in");
  };

  return logout;
};
