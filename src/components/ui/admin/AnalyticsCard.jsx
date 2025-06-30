import { ArrowUpRight } from "lucide-react";

const AnalyticsCard = ({ title, value, description, gradient, isLoading }) => {
  const cardClass = gradient
    ? "bg-gradient-to-tr from-primary to-accent text-white"
    : "bg-white text-black";

  const descClass = gradient ? "text-white/80" : "text-gray-600";

  if (isLoading) {
    return (
      <div className={`rounded-2xl p-5 w-full max-w-xs shadow-md flex flex-col justify-between gap-4 ${cardClass} animate-pulse`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="h-4 w-24 bg-white/40 dark:bg-gray-700 rounded mb-2" />
            <div className="h-8 w-32 bg-white/60 dark:bg-gray-600 rounded" />
          </div>
          <div className="w-5 h-5 bg-white/40 dark:bg-gray-700 rounded" />
        </div>
        <div className={`h-4 w-28 rounded ${gradient ? "bg-white/40" : "bg-gray-300"}`} />
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 w-full max-w-xs shadow-md flex flex-col justify-between gap-4 ${cardClass}`}>
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
