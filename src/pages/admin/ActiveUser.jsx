import React from 'react'
import AllUserTable from '../../components/ui/admin/AllUserTable'
import { useAdminAuth } from '../../hooks/useAdminAuth';

const ActiveUser = () => {

    const { userListData } = useAdminAuth();

  return (
    <section>
        <div>
            <h1 className="text-2xl font-bold">All Active Users</h1>
            <p className="text-sm opacity-70 mt-2">Real-time active users</p>
        </div>
          <AllUserTable users={userListData} />
    </section>
  )
}

export default ActiveUser