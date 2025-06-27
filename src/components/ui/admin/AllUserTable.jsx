import React from "react";

const AllUserTable = ({ users }) => {
  if (!users?.length) {
    return <p className="text-sm text-muted-foreground">No users found.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto bg-dark/50 rounded-lg">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-dark">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Has Subscription</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-2 font-medium opacity-70">{user.username}</td>
              <td className="px-4 py-2 opacity-70">{user.email}</td>
              <td className="px-4 py-2">
                {user.subscription ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-muted-foreground text-yellow-300">No</span>
                )}
              </td>
              <td className="px-4 py-2">
                {user.subscription ? (
                  <span
                    className={`font-semibold ${
                      user.subscription.status === "ACTIVE"
                        ? "text-green-600"
                        : user.subscription.status === "CANCELLED"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {user.subscription.status}
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-2 opacity-70">
                {user.subscription
                  ? new Date(user.subscription.createdAt).toLocaleDateString("id-ID")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserTable;
