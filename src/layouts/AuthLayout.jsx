import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <Outlet /> 
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-purple-500 to-indigo-500 items-center justify-center p-8 rounded-l-3xl">
        <img
          src="/auth-illustration.png" 
          alt="Illustration"
          className="w-full max-w-md object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
