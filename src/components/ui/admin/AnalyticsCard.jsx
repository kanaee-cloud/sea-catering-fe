import { ArrowUpRight } from "lucide-react";

const AnalyticsCard = ({ title, value, description, gradient }) => {
  const cardClass = gradient
    ? "bg-gradient-to-tr from-primary to-accent text-white"
    : "bg-white text-black";

  const descClass = gradient ? "text-white/80" : "text-gray-600";

  return (
    <div
      className={`rounded-2xl p-5 w-full max-w-xs shadow-md flex flex-col justify-between gap-4 ${cardClass}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 opacity-80" />
      </div>
      <p className={`text-sm ${descClass}`}>{description}</p>
    </div>
  );
};

export default AnalyticsCard;
