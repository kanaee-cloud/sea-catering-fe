const StatCard = ({ title, value, subtitle, color = "bg-blue-600" }) => {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-md ${color}`}>
      <h4 className="text-sm font-medium mb-1 opacity-90">{title}</h4>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-xs opacity-70 mt-1">{subtitle}</p>
    </div>
  );
};

export default StatCard;