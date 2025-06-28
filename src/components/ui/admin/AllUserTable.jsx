import React from "react";

const AllUserTable = ({ users }) => {
  if (!users?.length) {
    return <p className="text-sm text-muted-foreground">No users found.</p>;
  }


  const getStatusConfig = (status) => {
    const configs = {
      ACTIVE: { 
        color: "text-green-600", 
        bgColor: "bg-green-100 dark:bg-green-900/30",
        icon: "🟢" 
      },
      PAUSED: { 
        color: "text-yellow-600", 
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        icon: "🟡" 
      },
      CANCELLED: { 
        color: "text-red-500", 
        bgColor: "bg-red-100 dark:bg-red-900/30",
        icon: "🔴" 
      }
    };
    return configs[status] || { 
      color: "text-gray-500", 
      bgColor: "bg-gray-100 dark:bg-gray-900/30",
      icon: "⚪" 
    };
  };


  const getSubscriptionIndicator = (hasSubscription) => {
    return hasSubscription ? {
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      text: "Yes"
    } : {
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30", 
      text: "No"
    };
  };

  return (
    <div className="mt-6 overflow-x-auto bg-dark/50 rounded-lg">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-dark">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Email</th>
            <th className="px-4 py-3 text-left font-semibold">Has Subscription</th>
            <th className="px-4 py-3 text-left font-semibold">Status</th>
            <th className="px-4 py-3 text-left font-semibold">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const subscriptionIndicator = getSubscriptionIndicator(!!user.subscription);
            const statusConfig = user.subscription 
              ? getStatusConfig(user.subscription.status)
              : null;

            return (
              <tr key={user.id} className="hover:bg-gray-50 ">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium opacity-90">{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="opacity-70">{user.email}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${subscriptionIndicator.bgColor} ${subscriptionIndicator.color}`}>
                    <span>{subscriptionIndicator.text}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {user.subscription ? (
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}>
                      <span>{statusConfig.icon}</span>
                      <span>{user.subscription.status}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-500">
                      <span>—</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="opacity-70">
                    {user.subscription
                      ? new Date(user.subscription.createdAt).toLocaleDateString("id-ID")
                      : "—"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserTable;