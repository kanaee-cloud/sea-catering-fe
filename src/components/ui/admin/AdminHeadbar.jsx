import React from "react";
import { CircleUserRound } from "lucide-react";
import { useAdminAuth } from "../../../hooks/useAdminAuth";

const AdminHeadbar = () => {
  const { admin } = useAdminAuth();

  return (
    <header className="flex justify-between bg-gray p-4 rounded-lg">
      <h1 className="text-gray">.</h1>
      <div className="flex items-center gap-2">
        <CircleUserRound size={35} className="text-accent"/>
        <div className="flex flex-col">
          <p className="text-sm">{admin.username}</p>
          <p className="text-xs opacity-70">{admin.email}</p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeadbar;
