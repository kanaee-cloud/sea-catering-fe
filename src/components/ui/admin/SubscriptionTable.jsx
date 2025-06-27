import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

const SubscriptionTable = ({ users, onPause, onCancel, onResume }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  if (!users?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No active subscribed users found.
      </p>
    );
  }

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Plan</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => {
            const { id, username, email, subscription } = user;
            const isOpen = openMenuId === subscription.id;

            return (
              <tr
                key={id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 relative"
              >
                <td className="px-4 py-2 font-medium">{username}</td>
                <td className="px-4 py-2">{email}</td>
                <td className="px-4 py-2">{subscription.planType}</td>
                <td className="px-4 py-2 font-semibold text-green-600">
                  {subscription.status}
                </td>
                <td className="px-4 py-2 relative">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => toggleMenu(subscription.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
                        {subscription.status === "ACTIVE" && (
                          <>
                            <button
                              onClick={() => {
                                onPause(subscription.id, new Date());
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              Pause Now
                            </button>
                            <button
                              onClick={() => {
                                onCancel(subscription.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {(subscription.status === "PAUSED" ||
                          subscription.status === "CANCELLED") && (
                          <button
                            onClick={() => {
                              onResume(subscription.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
                          >
                            Resume
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
