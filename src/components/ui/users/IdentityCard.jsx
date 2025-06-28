import React from "react";
import { User, Mail, BadgeCheck, Sparkles } from "lucide-react";

const IdentityCard = ({ user }) => {
  if (!user) return null;

  const isExclusive = user.subscription && user.subscription.status === "ACTIVE";

  return (
    <div className="bg-gradient-to-tr from-primary to-accent text-white p-4 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex items-center gap-4">
        <div className="bg-primary/20 p-3 rounded-full">
          <User className="w-6 h-6 text-accent" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">{user.username}</h2>
            {isExclusive && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 text-yellow-300 text-xs rounded-full border border-yellow-300/30">
                <Sparkles className="w-3 h-3" />
                Exclusive
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
  );
};

export default IdentityCard;
