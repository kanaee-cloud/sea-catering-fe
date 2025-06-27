import React from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import AnalyticsCard from "../../components/common/AnalyticsCard";

const AdminDashboard = () => {
  const { dashboard } = useAdminAuth();

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm opacity-70 mt-2">Real-time analytics and insights</p>
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
    </section>
  );
};

export default AdminDashboard;
