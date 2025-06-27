import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import IdentityCard from "../../components/common/IdentityCard";
import SubscriptionCard from "../../components/common/UserSubscriptionCard";
import StatCard from "../../components/common/StatCard";
import UserSubscriptionCard from "../../components/common/UserSubscriptionCard";

const UserDashboard = () => {
  const { user } = useUserAuth();

  return (
    <section>
      <div className="lg:flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Welcome back, {user.username}!
          </h1>
          <p className="text-sm opacity-70">Its good to see you again</p>
        </div>
        <IdentityCard user={user} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
        <StatCard
          title="Balance"
          value="$5,552.00"
          subtitle="+8% this month"
          color="bg-purple-600"
        />
        <StatCard
          title="Est. Balance USDT"
          value="$682.50"
          subtitle="+12% last week"
          color="bg-green-600"
        />
        <StatCard
          title="Est. Balance IDR"
          value="Rp 3.096.000"
          subtitle="Active Subscription"
          color="bg-indigo-600"
        />
      </div>

      {user.subscription && (
        <div className="mt-6">
          <UserSubscriptionCard subscription={user.subscription} />
        </div>
      )}
    </section>
  );
};

export default UserDashboard;
