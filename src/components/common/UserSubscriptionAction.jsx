import { useUserAuth } from "../../hooks/useUserAuth";

const UserSubscriptionActions = () => {
  const {
    user,
    handlePause,
    handleResume,
    handleCancel,
  } = useUserAuth();

  const subscription = user?.subscription;

  if (!subscription) return null;

  const handleAction = async (type) => {
    let res;
    if (type === "pause") res = await handlePause();
    if (type === "resume") res = await handleResume();
    if (type === "cancel") res = await handleCancel();

    if (res?.success) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful`);
    } else {
      alert(res?.message || "Action failed");
    }
  };

  return (
    <div className="mt-6 bg-white/10 border border-white/20 p-4 rounded-xl">
      <h2 className="text-lg font-semibold text-white mb-2">
        Manage Your Subscription
      </h2>
      <p className="text-sm text-white/70 mb-4">
        Current status: <span className="font-bold">{subscription.status}</span>
      </p>
      <div className="flex gap-3 flex-wrap">
        {subscription.status === "ACTIVE" && (
          <>
            <button
              onClick={() => handleAction("pause")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Pause Subscription
            </button>
            <button
              onClick={() => handleAction("cancel")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel Subscription
            </button>
          </>
        )}

        {subscription.status === "PAUSED" && (
          <button
            onClick={() => handleAction("resume")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Resume Subscription
          </button>
        )}

        {subscription.status === "CANCELLED" && (
          <button
            onClick={() => handleAction("resume")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Reactivate Subscription
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSubscriptionActions;