import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="bg-primary w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-500 via-fuchsia-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-[60%] w-[400px] h-[400px] bg-gradient-to-tr from-pink-500 via-indigo-500 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-400 rounded-full blur-2xl opacity-20" />
        <div className="relative z-10 flex flex-col h-screen items-center justify-center max-w-md w-full">
          <Outlet />
        </div>
      </div>

      <div className="text-light hidden md:flex flex-col w-1/2 bg-gradient-to-tr from-primary to-accent items-center justify-center p-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          SEA Catering
        </h2>
        <p className="text-base md:text-lg text-gray-300 mb-6">
          Healthy Meals, Anytime, Anywhere.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
