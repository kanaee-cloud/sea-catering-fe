import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayout";
import AuthLayout from "../layouts/AuthLayout";

// Landing Pages
import Home from "../pages/landing/Home";
import MealPlans from "../pages/landing/MealPlans";

// Auth Pages
import AuthForm from "../pages/auth/AuthForm";
import { Contact, Subscript } from "lucide-react";
import Subscription from "../pages/landing/Subscription";
import ContactUs from "../pages/landing/ContactUs";
import AdminLoginForm from "../pages/auth/AdminLoginForm";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import SubscriptionUser from "../pages/admin/SubscriptionUser";
import { ProtectedRoute } from "./ProtectedRoute";
import ActiveUser from "../pages/admin/ActiveUser";
import AdminSettings from "../pages/admin/AdminSettings";
import UserDashboard from "../pages/users/UserDashboard";
import UserSubscription from "../pages/users/UserSubscription";
import UserSettings from "../pages/users/UserSettings";
import UserLayout from "../layouts/UserLayout";
import SuccessPage from "../components/common/SuccessPage";

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
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "subscription",
        element: <SubscriptionUser />,
      },
      {
        path: "user-list",
        element: <ActiveUser />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute requireUser>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "subscription",
        element: <UserSubscription />,
      },
      {
        path: "settings",
        element: <UserSettings />,
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
      },
    ],
  },
  {
    path: "/auth/admin",
    element: <AdminLoginForm />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

export default router;
