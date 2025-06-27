import { Outlet } from "react-router-dom";
import UserSidebar from "../components/ui/users/UserSidebar";
import UserHeadbar from "../components/ui/users/UserHeadbar";

const UserLayout = () => {
  return (
    <main className="flex bg-dark min-h-screen text-light gap-4 overflow-hidden">
      <UserSidebar />
      <div className="flex flex-col flex-1 overflow-hidden gap-4 p-4">
        <UserHeadbar />
        <div className="bg-gray flex-1 overflow-auto py-4 px-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default UserLayout;
