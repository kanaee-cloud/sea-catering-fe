const StatusIndicator = ({ status }) => {
  const statusConfig = {
    ACTIVE: { color: "text-green-400", bg: "bg-green-500/20", icon: "🟢" },
    PAUSED: { color: "text-yellow-400", bg: "bg-yellow-500/20", icon: "🟡" },
    CANCELLED: { color: "text-red-400", bg: "bg-red-500/20", icon: "🔴" },
  };

  const config = statusConfig[status] || {
    color: "text-gray-400",
    bg: "bg-gray-500/20",
    icon: "⚪",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
      <span>{config.icon}</span>
      <span className={`font-semibold text-sm ${config.color}`}>
        {status}
      </span>
    </div>
  );
};

export default StatusIndicator;
