import IdentityCard from "../../components/ui/users/IdentityCard";
import StatCard from "../../components/ui/users/StatCard";
import UserSubscriptionCard from "../../components/ui/users/UserSubscriptionCard";
import { useUserAuth } from "../../hooks/useUserAuth";


const UserDashboard = () => {
  const { user } = useUserAuth();

  return (
    <section>
      <div className="lg:flex justify-between items-center gap-4 mb-6">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">
            Welcome back, {user.username}!
          </h1>
          <p className="text-sm opacity-70">Its good to see you again</p>
        </div>
        <IdentityCard user={user} />
      </div>

      <StatCard
        title="Subscription Status"
        value={user.subscription?.status || "No Subscription Yet"}
        subtitle={user.subscription?.status === "ACTIVE" ? "Active" : "Inactive"}
        color="glassmorphism"
      />
    {user.subscription && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
        <StatCard
          title="Est. Balance USDT"
          value="$682.50"
          subtitle="+12% last week"
          color="bg-gradient-to-tr from-blue-500 to-accent text-white"
        />
        <StatCard
          title="Est. Balance for Subscription"
          value={`Rp ${Number(user.subscription.totalPrice).toLocaleString("id-ID")}`}
          subtitle="Active Subscription"
          color="bg-gradient-to-tr from-primary to-blue-500 text-white"
        />
      </div>
      )}

      {user.subscription && (
        <div className="mt-6">
          <UserSubscriptionCard subscription={user.subscription} />
        </div>
      )}
    </section>
  );
};

export default UserDashboard;
