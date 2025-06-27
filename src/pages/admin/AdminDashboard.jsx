import React, { useMemo, useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import AnalyticsCard from "../../components/common/AnalyticsCard";
import SubscriptionTable from "../../components/ui/admin/SubscriptionTable";

const AdminDashboard = () => {
  const {
    dashboard,
    userListData,
    handlePauseSubscription,
    handleCancelSubscription,
    handleResumeSubscription,
  } = useAdminAuth();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return userListData
      ?.filter(
        (user) => user.subscription && user.subscription.status === "ACTIVE"
      )
      ?.filter((user) => {
        const q = search.toLowerCase();
        return (
          user.username.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q)
        );
      });
  }, [userListData, search]);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm opacity-70 mt-2">
          Real-time analytics and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        <AnalyticsCard
          title="New Subscriptions"
          value={dashboard?.newSubscriptions || 0}
          description="Since this month"
          gradient
        />
        <AnalyticsCard
          title="MRR (Monthly Revenue)"
          value={`Rp ${dashboard?.MRR?.toLocaleString("id-ID") || 0}`}
          description="Estimated gross revenue"
        />
        <AnalyticsCard
          title="Reactivations"
          value={dashboard?.reactivations || 0}
          description="Returning customers"
        />
      </div>
      <div className="lg:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Active Subscription</h1>
          <p className="text-sm opacity-70 mt-2">
            Currently active subscriptions
          </p>
        </div>
        <input
          type="text"
          placeholder="Search user by name or email..."
          className="w-full max-w-sm px-4 py-2 mb-4 border rounded-md bg-dark border-dark"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {userListData && (
        <SubscriptionTable
          users={filteredUsers}
          onPause={handlePauseSubscription}
          onCancel={handleCancelSubscription}
          onResume={handleResumeSubscription}
        />
      )}
    </section>
  );
};

export default AdminDashboard;
