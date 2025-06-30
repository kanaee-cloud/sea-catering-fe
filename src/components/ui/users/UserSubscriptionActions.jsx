import { useState } from "react";
import { useUserAuth } from "../../../hooks/useUserAuth";
import StatusIndicator from "../../common/StatusIndicator";
import ActionButtons from "../../common/ActionButtons";

const UserSubscriptionActions = () => {
  const {
    user,
    handlePause,
    handleResume,
    handleCancel,
  } = useUserAuth();

  const [loadingAction, setLoadingAction] = useState("");
  const subscription = user?.subscription;

  const handleAction = async (type) => {
    const subscriptionId = subscription.id;
    setLoadingAction(type);

    const res = type === "pause"
      ? await handlePause(subscriptionId)
      : type === "resume"
      ? await handleResume(subscriptionId)
      : type === "cancel"
      ? await handleCancel(subscriptionId)
      : null;

    setLoadingAction("");

    return res;
  };

  if (!subscription) {
    return (
      <div className="mt-6 bg-gradient-to-br from-blue/10 to-blue/5 backdrop-blur-sm border border-blue/20 p-6 rounded-2xl shadow-xl text-center">
        <h2 className="text-xl font-bold text-white mb-2">No Active Subscription</h2>
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
    );
  }

  return (
    <div className="mt-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Manage Your Subscription</h2>
        <StatusIndicator status={subscription.status} />
      </div>

      <p className="text-sm text-white/70 mb-6">
        {subscription.status === "ACTIVE"
          ? "Your subscription is currently active. You can pause or cancel it anytime."
          : subscription.status === "PAUSED"
          ? "Your subscription is paused. Resume to continue enjoying our services."
          : subscription.status === "CANCELLED"
          ? "Your subscription has been cancelled. Reactivate to restore access."
          : "Manage your subscription settings below."}
      </p>

      <ActionButtons
        status={subscription.status}
        onAction={handleAction}
        loadingAction={loadingAction}
      />

      {subscription.id && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50">Subscription ID: {subscription.id}</p>
        </div>
      )}
    </div>
  );
};

export default UserSubscriptionActions;