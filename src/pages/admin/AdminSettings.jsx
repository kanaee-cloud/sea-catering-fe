import React from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminSettings = () => {
  const { admin, handleAdminLogout } = useAdminAuth();

  return (
    <section>
      <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="text-left">
            <th>Account Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{admin.username}</td>
            <td>{admin.email}</td>
          </tr>
        </tbody>
      </table>
      <table className="mt-4 min-w-full table-auto text-sm">
        <thead>
          <tr className="text-left">
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{admin.role}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleAdminLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-5">Logout</button>
    </section>
  );
};

export default AdminSettings;

