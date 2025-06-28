import { useUserAuth } from "../../../hooks/useUserAuth";

const UserSubscriptionActions = () => {
  const {
    user,
    handlePause,
    handleResume,
    handleCancel,
  } = useUserAuth();

  const subscription = user?.subscription;


  if (!subscription) {
    return (
      <div className="mt-6 bg-gradient-to-br from-blue/10 to-blue/5 backdrop-blur-sm border border-blue/20 p-6 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            No Active Subscription
          </h2>
          <p className="text-sm text-white/70 mb-6">
            You don't have an active subscription yet. Choose a plan to get started!
          </p>
          <button
            onClick={() => window.location.href = '/subscription'}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🚀 View Subscription Plans
          </button>
        </div>
      </div>
    );
  }

  const handleAction = async (type) => {
    const subscriptionId = subscription.id;
    
    const res = type === "pause" 
      ? await handlePause(subscriptionId)
      : type === "resume" 
      ? await handleResume(subscriptionId)
      : type === "cancel"
      ? await handleCancel(subscriptionId)
      : null;

    if (res?.success) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful`);
    } else {
      alert(res?.message || "Action failed");
    }
  };


  const getActionButtons = () => {
    const status = subscription.status;
    
    return status === "ACTIVE" ? (
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => handleAction("pause")}
          className="flex-1 min-w-[140px] bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Pause Subscription
        </button>
        <button
          onClick={() => handleAction("cancel")}
          className="flex-1 min-w-[140px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Cancel Subscription
        </button>
      </div>
    ) : status === "PAUSED" ? (
      <button
        onClick={() => handleAction("resume")}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Resume Subscription
      </button>
    ) : status === "CANCELLED" ? (
      <button
        onClick={() => handleAction("resume")}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Reactivate Subscription
      </button>
    ) : (
      <div className="text-center py-4">
        <span className="text-white/60 italic">No actions available for current status</span>
      </div>
    );
  };


  const getStatusIndicator = () => {
    const status = subscription.status;
    const statusConfig = {
      ACTIVE: { color: "text-green-400", bg: "bg-green-500/20", icon: "🟢" },
      PAUSED: { color: "text-yellow-400", bg: "bg-yellow-500/20", icon: "🟡" },
      CANCELLED: { color: "text-red-400", bg: "bg-red-500/20", icon: "🔴" },
    };

    const config = statusConfig[status] || { 
      color: "text-gray-400", 
      bg: "bg-gray-500/20", 
      icon: "⚪" 
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

  return (
    <div className="mt-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Manage Your Subscription
        </h2>
        {getStatusIndicator()}
      </div>
      
      <p className="text-sm text-white/70 mb-6">
        {subscription.status === "ACTIVE" 
          ? "Your subscription is currently active. You can pause or cancel it anytime."
          : subscription.status === "PAUSED"
          ? "Your subscription is paused. Resume to continue enjoying our services."
          : subscription.status === "CANCELLED"
          ? "Your subscription has been cancelled. Reactivate to restore access."
          : "Manage your subscription settings below."
        }
      </p>

      {getActionButtons()}

      {/* Additional subscription info */}
      {subscription.id && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50">
            Subscription ID: {subscription.id}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserSubscriptionActions;