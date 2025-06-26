import React from 'react'
import AdminSidebar from '../components/ui/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <main className='flex bg-dark p-4 gap-4 h-screen text-light'>
        <AdminSidebar />
        <div className=" bg-gray">
            <Outlet />
        </div>
    </main>
  )
}

export default AdminLayout