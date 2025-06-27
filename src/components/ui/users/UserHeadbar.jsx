import { CircleUserRound } from "lucide-react";
import { useUserAuth } from "../../../hooks/useUserAuth";

const UserHeadbar = () => {
  const { user } = useUserAuth();
//   console.log(user);

  return (
    <header className="flex justify-between bg-gray p-4 rounded-lg">
      <h1 className="text-gray">.</h1>
      <div className="flex items-center gap-2">
        <CircleUserRound size={35} className="text-accent"/>
        <div className="flex flex-col">
          <p className="text-sm">{user.username}</p>
          <p className="text-xs opacity-70">{user.email}</p>
        </div>
      </div>
    </header>
  );
};

export default UserHeadbar;
