import React from 'react'
import UserSubscriptionActions from '../../components/ui/users/UserSubscriptionActions'
import UserSubscriptionCard from "../../components/ui/users/UserSubscriptionCard";
import { useUserAuth } from '../../hooks/useUserAuth';

const UserSubscription = () => {

  const { user } = useUserAuth();
  return (
    <section>
        <UserSubscriptionActions />
        {user.subscription && (
        <div className="mt-6">
          <UserSubscriptionCard subscription={user.subscription} />
        </div>
      )}
    </section>
  )
}

export default UserSubscription