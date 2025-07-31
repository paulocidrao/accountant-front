import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layout/auth";
import { Signin } from "../pages/auth/sign-in";
import { AppLayout } from "@/layout/app";
import { Home } from "@/pages/home";
import { Profile } from "@/pages/Profile";
import { Company } from "@/pages/company";
import { Config } from "@/pages/Config";
import { Records } from "@/pages/records";
import { ForgotPassword } from "@/pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <Signin /> },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/user",
        element: <Profile />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/configurations",
        element: <Config />,
      },
      {
        path: "/records",
        element: <Records />,
      },
    ],
  },
]);
