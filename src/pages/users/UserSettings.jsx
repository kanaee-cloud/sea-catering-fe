import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";

const UserSettings = () => {
  const { user, handleLogout } = useUserAuth();

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
            <td>{user.username}</td>
            <td>{user.email}</td>
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
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-5">Logout</button>
    </section>
  );
};

export default UserSettings;

