import React from "react";

const UserSubscriptionTable = ({ subscription }) => {
  const {
    planType,
    totalPrice,
    status,
    mealTypes,
    deliveryDays,
    createdAt,
  } = subscription;

  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Get status configuration
  const getStatusConfig = (status) => {
    const configs = {
      ACTIVE: { 
        color: "text-green-300", 
        bgColor: "bg-green-500/20",
        icon: "🟢" 
      },
      PAUSED: { 
        color: "text-yellow-300", 
        bgColor: "bg-yellow-500/20",
        icon: "🟡" 
      },
      CANCELLED: { 
        color: "text-red-300", 
        bgColor: "bg-red-500/20",
        icon: "🔴" 
      }
    };
    return configs[status] || { 
      color: "text-gray-300", 
      bgColor: "bg-gray-500/20",
      icon: "⚪" 
    };
  };

  const statusConfig = getStatusConfig(status);

  const tableData = [
    { label: "Plan Type", value: planType },
    { label: "Total Price", value: `Rp ${totalPrice.toLocaleString("id-ID")}` },
    { 
      label: "Status", 
      value: (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
          <span>{statusConfig.icon}</span>
          <span>{status}</span>
        </div>
      )
    },
    { label: "Meal Types", value: `${mealTypes.split(",").length} types` },
    { label: "Delivery Days", value: `${deliveryDays.split(",").length} days/week` },
    { label: "Subscribed At", value: formattedDate },
  ];

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl shadow-md overflow-hidden">
      <div className="bg-white/5 px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-bold text-blue-100">
          Subscription Summary
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {tableData.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-white/90 bg-white/5 w-1/3">
                  {item.label}
                </td>
                <td className="px-6 py-4 text-white/80">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSubscriptionTable;