import React, { useMemo, useState } from 'react'
import SubscriptionTable from '../../components/ui/admin/SubscriptionTable'
import { useAdminAuth } from '../../hooks/useAdminAuth';
// import { useAdminAuth } from '../../hooks/useAdminAuth';
// import AllUserTable from '../../components/ui/admin/AllUserTable';

const SubscriptionUser = () => {

  const {
      userListData,
      handlePauseSubscription,
      handleCancelSubscription,
      handleResumeSubscription,
    } = useAdminAuth();
    const [search, setSearch] = useState("");
  
    const filteredUsers = useMemo(() => {
      return userListData
        ?.filter(
          (user) => user.subscription 
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
    <section>
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
  )
}

export default SubscriptionUser