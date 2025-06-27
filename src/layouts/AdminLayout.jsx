import React from "react";
import AdminSidebar from "../components/ui/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeadbar from "../components/ui/admin/AdminHeadbar";

const AdminLayout = () => {
  return (
    <main className="flex bg-dark min-h-screen text-light gap-4 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden gap-4 p-4">
        <AdminHeadbar />
        <div className="bg-gray flex-1 overflow-auto py-4 px-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
