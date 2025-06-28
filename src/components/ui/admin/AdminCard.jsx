import React from "react";
import { User, Mail, BadgeCheck, Shield } from "lucide-react";

const AdminCard = ({ user }) => {
  if (!user) return null;

  const isExclusive = user.role === "ADMIN";

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 rounded-2xl blur-[6px] z-0 opacity-70 animate-pulse rainbow-shadow" />
      <div className="relative z-10 bg-gradient-to-br from-blue-500 to-accent text-white p-4 rounded-2xl shadow-lg glassmorphism backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <User className="w-6 h-6 text-light" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{user.username}</h2>
              {isExclusive && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-400/10 text-yellow-300 text-xs rounded-full border border-primary/30">
                  <Shield className="w-3 h-3" />
                  SUPER ADMIN
                </span>
              )}
            </div>
            <p className="text-sm opacity-70 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
            <p className="text-sm mt-1 flex items-center gap-1">
              <BadgeCheck className="w-4 h-4 text-green-400" />
              Verified as {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
