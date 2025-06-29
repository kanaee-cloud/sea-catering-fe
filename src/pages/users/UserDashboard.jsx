import IdentityCard from "../../components/ui/users/IdentityCard";
import StatCard from "../../components/ui/users/StatCard";
import UserSubscriptionCard from "../../components/ui/users/UserSubscriptionCard";
import { useUserAuth } from "../../hooks/useUserAuth";


const UserDashboard = () => {
  const { user } = useUserAuth();

  return (
    <section>
      <div className="lg:flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Welcome back, {user.username}!
          </h1>
          <p className="text-sm opacity-70">Its good to see you again</p>
        </div>
        <IdentityCard user={user} />
      </div>

    {user.subscription && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
        <StatCard
          title="Balance"
          value="$5,552.00"
          subtitle="+8% this month"
          color="glassmorphism"
        />
        <StatCard
          title="Est. Balance USDT"
          value="$682.50"
          subtitle="+12% last week"
          color="bg-light text-dark"
        />
        <StatCard
          title="Est. Balance for Subscription"
          value={`Rp ${Number(user.subscription.totalPrice).toLocaleString("id-ID")}`}
          subtitle="Active Subscription"
          color="bg-indigo-600"
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
