import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import AuthLayout from "../layouts/AuthLayout";

// Landing Pages
import Home from "../pages/landing/Home";
import MealPlans from "../pages/landing/MealPlans";

// Auth Pages
import AuthForm from "../pages/auth/AuthForm";
import { Subscript } from "lucide-react";
import Subscription from "../pages/landing/Subscription";

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
        path: "mealplans",
        element: <MealPlans />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <AuthForm />,
      }
    ],
  },
]);

export default router;
