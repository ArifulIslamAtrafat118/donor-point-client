import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/ErrorPage";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import SearchPage from "../pages/SearchPage/SearchPage";
import BlogPage from "../pages/blogPage/BlogPage";
import CreateDonationRequest from "../pages/CreateUpdateDonationRequestPage/CreateDonationRequest";
import PrivateRoute from "../components/guards/PrivateRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import AllUsers from "../pages/dashboard/all-user/AllUsers";
import Unauthorized from "../pages/Unauthorized";
import AdminRoute from "../components/guards/AdminRoute";
import MyDonationRequests from "../pages/dashboard/MyDonationRequests";
import AllDonationRequest from "../pages/dashboard/AllDonationRequest";

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
      {
        path: "/search",
        Component: SearchPage,
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests/>,
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequest/>,
      },
      {
        path: "content-management",
        element: <p>content-management</p>,
      },
      {
        path: "funding",
        element: <p>funding</p>,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
