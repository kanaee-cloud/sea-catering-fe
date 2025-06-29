import React from "react";
import SubscriptionInfo from "../../components/ui/Subscription/SubscriptionInfo";

const Subscription = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen mt-12">
      <h1 className="text-2xl font-bold text-center">Get Your First Subscription Now!</h1>
      <p className="text-center text-light opacity-70 mb-6 mt-12 w-3/4 md:w-1/2">
        Enjoy the convenience of planning a healthy and flexible meal plan. 
        Choose a package, schedule, and we'll deliver it right to your door.
      </p>
      <SubscriptionInfo />
    </main>
  );
};

export default Subscription;
