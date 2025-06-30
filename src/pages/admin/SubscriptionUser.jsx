import React, { useMemo, useState } from "react";
import SubscriptionTable from "../../components/ui/admin/SubscriptionTable";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import DateRangeFilter from "../../components/ui/admin/DateRangeFilter";
// Pastikan path-nya benar

const SubscriptionUser = () => {
  const {
    userListData,
    handlePauseSubscription,
    handleCancelSubscription,
    handleResumeSubscription,
    loading,
    admin,
  } = useAdminAuth();

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const handleDateChange = (key, value) => {
    setDateRange((prev) => ({ ...prev, [key]: value }));
  };


  const filteredUsers = useMemo(() => {
    return userListData
      ?.filter((user) => user.subscription)
      ?.filter((user) => {
        const q = search.toLowerCase();
        return (
          user.username.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q)
        );
      })
      ?.filter((user) => {
        if (!dateRange.startDate && !dateRange.endDate) return true;
        const createdAt = new Date(user.subscription.createdAt);
        const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
        const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

        if (start && end) return createdAt >= start && createdAt <= end;
        if (start) return createdAt >= start;
        if (end) return createdAt <= end;
        return true;
      });
  }, [userListData, search, dateRange]);

  const isUserListLoading = loading.userList || !userListData || !admin;

  return (
    <section>
      <div className="lg:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscription</h1>
          <p className="text-sm opacity-70 mt-2">Currently subscriptions</p>
        </div>
        
      </div>

      <div className="mb-4 mt-4 lg:flex justify-between items-center">
        <input
          type="text"
          placeholder="Search user by name or email..."
          className="w-full max-w-sm px-4 py-2 mt-5 mb-6 lg:mb-0 border rounded-md bg-dark border-dark"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DateRangeFilter
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={handleDateChange}
       
        />
      </div>

      <SubscriptionTable
        users={filteredUsers || []}
        onPause={handlePauseSubscription}
        onCancel={handleCancelSubscription}
        onResume={handleResumeSubscription}
        isLoading={isUserListLoading}
      />
    </section>
  );
};

export default SubscriptionUser;
