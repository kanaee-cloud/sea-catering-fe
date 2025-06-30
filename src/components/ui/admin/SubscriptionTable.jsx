import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-4 bg-light/50 rounded w-full" />
      </td>
    ))}
  </tr>
);

const SubscriptionTable = ({ users, onPause, onCancel, onResume, isLoading }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loadingActionId, setLoadingActionId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const getStatusConfig = (status) => {
    const configs = {
      ACTIVE: {
        color: "text-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        icon: "🟢",
      },
      PAUSED: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        icon: "🟡",
      },
      CANCELLED: {
        color: "text-red-500",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        icon: "🔴",
      },
    };
    return configs[status] || {
      color: "text-gray-500",
      bgColor: "bg-gray-100 dark:bg-gray-900/30",
      icon: "⚪",
    };
  };

  const handleAction = async (action, subscriptionId) => {
    try {
      setLoadingActionId(subscriptionId);
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
      setLoadingActionId(null);
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                    No active subscribed users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const { id, username, email, subscription } = user;
                  const isOpen = openMenuId === subscription.id;
                  const statusConfig = getStatusConfig(subscription.status);
                  const isLoadingThis = loadingActionId === subscription.id;

                  return (
                    <tr key={id}>
                      <td className="px-4 py-3">{username}</td>
                      <td className="px-4 py-3">{email}</td>
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
                        {new Date(subscription.createdAt).toLocaleDateString("id-ID")}
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
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-600 transition-colors flex items-center gap-2"
                                    disabled={isLoadingThis}
                                  >
                                    {isLoadingThis ? (
                                      <span className="w-4 h-4 border-2 border-yellow-300 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <span>Pause</span>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleAction("cancel", subscription.id)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 transition-colors flex items-center gap-2"
                                    disabled={isLoadingThis}
                                  >
                                    {isLoadingThis ? (
                                      <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <span>Cancel</span>
                                    )}
                                  </button>
                                </>
                              )}
                              {(subscription.status === "PAUSED" || subscription.status === "CANCELLED") && (
                                <button
                                  onClick={() => handleAction("resume", subscription.id)}
                                  onMouseDown={(e) => e.preventDefault()}
                                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 transition-colors flex items-center gap-2"
                                  disabled={isLoadingThis}
                                >
                                  {isLoadingThis ? (
                                    <span className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <>
                                      <span>{subscription.status === "PAUSED" ? "Resume" : "Reactivate"}</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;
