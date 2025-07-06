import { createBrowserRouter } from "react-router";
import { AuthLayout } from "../layout/auth";
import { Signin } from "../pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <Signin /> }],
  },
]);
