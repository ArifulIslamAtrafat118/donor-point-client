import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/ErrorPage";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
      {
        path: "/sign-in",
        Component: SignIn,
      },
    ],
  },
]);
