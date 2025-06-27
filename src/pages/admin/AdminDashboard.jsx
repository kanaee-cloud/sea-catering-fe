import { useState, useEffect } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import AnalyticsCard from "../../components/common/AnalyticsCard";

// Fungsi bantu untuk format tanggal yyyy-mm-dd
const formatDate = (date) => date.toISOString().split("T")[0];

const AdminDashboard = () => {
  const { fetchAdminDashboard, dashboard } = useAdminAuth();

  const defaultStart = formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)); 
  const defaultEnd = formatDate(new Date()); 

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);

  // Fetch saat startDate / endDate berubah
  useEffect(() => {
    if (startDate && endDate) {
      fetchAdminDashboard({ startDate, endDate });
    }
  }, [startDate, endDate]);

  return (
    <section className="flex flex-col gap-6">
      <div className="lg:flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm opacity-70 mt-2">Real-time analytics and insights</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-sm block mb-1">Start Date</label>
          <input
            type="date"
            className=" px-2 py-1 rounded opacity-70 bg-dark/50"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm block mb-1">End Date</label>
          <input
            type="date"
            className="bg-dark/50 opacity-70 px-2 py-1 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      </div>

      {/* Dashboard Cards */}
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
