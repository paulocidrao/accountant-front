import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layout/auth";
import { Signin } from "../pages/auth/sign-in";
import { AppLayout } from "@/layout/app";
import { Home } from "@/pages/home";
import { Profile } from "@/pages/Profile";
import { Company } from "@/pages/company";
import { Config } from "@/pages/Config";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "sign-in", element: <Signin /> }],
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
    ],
  },
]);
