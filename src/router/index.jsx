import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import Home from "../pages/landing/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
