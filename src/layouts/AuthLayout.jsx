import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">

      <div className="bg-light w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
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
