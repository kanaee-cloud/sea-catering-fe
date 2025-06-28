import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

const SubscriptionTable = ({ users, onPause, onCancel, onResume }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  if (!users?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          No active subscribed users found.
        </p>
      </div>
    );
  }

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // Get status configuration
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

  const handleAction = async (action, subscriptionId) => {
    try {
      if (action === "pause") {
        await onPause(subscriptionId, new Date());
      } else if (action === "cancel") {
        await onCancel(subscriptionId);
      } else if (action === "resume") {
        await onResume(subscriptionId);
      }
    } catch (error) {
      console.error(`Failed to ${action} subscription:`, error);
    } finally {
      setOpenMenuId(null);
    }
  };

  return (
    <div className="mt-6 overflow-x-auto bg-dark/50 rounded-lg shadow-lg">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-dark">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Email</th>
            <th className="px-4 py-3 text-left font-semibold">Plan</th>
            <th className="px-4 py-3 text-left font-semibold">Status</th>
            <th className="px-4 py-3 text-left font-semibold">Created At</th>
            <th className="px-4 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id, username, email, subscription } = user;
            const isOpen = openMenuId === subscription.id;
            const statusConfig = getStatusConfig(subscription.status);

            return (
              <tr
                key={id}
                className=""
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium opacity-90">{username}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="opacity-70">{email}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                    {subscription.planType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}>
                    <span>{statusConfig.icon}</span>
                    <span>{subscription.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="opacity-70">
                    {new Date(subscription.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </td>
                <td className="px-4 py-3 relative">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => toggleMenu(subscription.id)}
                      onBlur={(e) => {
                        setTimeout(() => {
                          if (!e.currentTarget.parentElement.contains(document.activeElement)) {
                            setOpenMenuId(null);
                          }
                        }, 100);
                      }}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      aria-label="More actions"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-44 bg-dark dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                        {subscription.status === "ACTIVE" && (
                          <>
                            <button
                              onClick={() => handleAction("pause", subscription.id)}
                              onMouseDown={(e) => e.preventDefault()} // Prevent blur on parent
                              className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-600 transition-colors flex items-center gap-2"
                            >
                      
                              <span>Pause Subscription</span>
                            </button>
                            <button
                              onClick={() => handleAction("cancel", subscription.id)}
                              onMouseDown={(e) => e.preventDefault()} // Prevent blur on parent
                              className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 transition-colors flex items-center gap-2"
                            >
                             
                              <span>Cancel Subscription</span>
                            </button>
                          </>
                        )}
                        {(subscription.status === "PAUSED" || subscription.status === "CANCELLED") && (
                          <button
                            onClick={() => handleAction("resume", subscription.id)}
                            onMouseDown={(e) => e.preventDefault()} // Prevent blur on parent
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 transition-colors flex items-center gap-2"
                          >
                            <span>{subscription.status === "PAUSED" ? "▶️" : "🔄"}</span>
                            <span>{subscription.status === "PAUSED" ? "Resume Subscription" : "Reactivate Subscription"}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;