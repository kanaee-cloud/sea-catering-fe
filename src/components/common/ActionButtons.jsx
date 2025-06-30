import { Loader2 } from "lucide-react";

const ActionButtons = ({ status, onAction, loadingAction }) => {
  const baseClass =
    "text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center";

  const isLoading = (type) => loadingAction === type;

  if (status === "ACTIVE") {
    return (
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => onAction("pause")}
          disabled={isLoading("pause")}
          className={`flex-1 min-w-[140px] bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 ${isLoading("pause") ? "opacity-70 cursor-not-allowed" : ""} ${baseClass}`}
        >
          {isLoading("pause") ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pause Subscription"}
        </button>
        <button
          onClick={() => onAction("cancel")}
          disabled={isLoading("cancel")}
          className={`flex-1 min-w-[140px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 ${isLoading("cancel") ? "opacity-70 cursor-not-allowed" : ""} ${baseClass}`}
        >
          {isLoading("cancel") ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cancel Subscription"}
        </button>
      </div>
    );
  }

  if (status === "PAUSED" || status === "CANCELLED") {
    return (
      <button
        onClick={() => onAction("resume")}
        disabled={isLoading("resume")}
        className={`w-full bg-gradient-to-r ${status === "PAUSED" ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"} ${isLoading("resume") ? "opacity-70 cursor-not-allowed" : ""} ${baseClass}`}
      >
        {isLoading("resume") ? <Loader2 className="w-5 h-5 animate-spin" /> : status === "CANCELLED" ? "Reactivate Subscription" : "Resume Subscription"}
      </button>
    );
  }

  return (
    <div className="text-center py-4">
      <span className="text-white/60 italic">No actions available for current status</span>
    </div>
  );
};

export default ActionButtons;
