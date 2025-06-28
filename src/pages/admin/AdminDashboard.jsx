// pages/admin/AdminDashboard.jsx

import { useAdminAuth } from "../../hooks/useAdminAuth";
import AnalyticsCard from "../../components/ui/admin/AnalyticsCard";
import DateRangeFilter from "../../components/ui/admin/DateRangeFilter";
import { useState } from "react";
import AdminCard from "../../components/ui/admin/AdminCard";

const AdminDashboard = () => {
  const { fetchAdminDashboard, dashboard, getDefaultDateRange, admin } = useAdminAuth();
  const defaultRange = getDefaultDateRange();
  const [filters, setFilters] = useState({
    startDate: defaultRange.startDate,
    endDate: defaultRange.endDate,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await fetchAdminDashboard(filters.startDate, filters.endDate);
  };





  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {admin.username}</h1>
          <p className="text-sm opacity-70">Good to see you again</p>
        </div>
          <AdminCard user={admin} />
      </div>
      <div className="lg:flex items-start justify-between gap-6">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm opacity-70 mt-2">
            Real-time analytics and insights
          </p>
        </div>
      <DateRangeFilter
        startDate={filters.startDate}
        endDate={filters.endDate}
        onChange={handleFilterChange}
        onSubmit={handleSubmit}
      />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        <AnalyticsCard
          title="New Subscriptions"
          value={dashboard?.newSubscriptions || 0}
          description="Since selected range"
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