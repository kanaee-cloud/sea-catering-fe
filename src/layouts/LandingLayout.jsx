import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const LandingLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] text-white">
      
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-500 via-fuchsia-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/2 left-[60%] w-[400px] h-[400px] bg-gradient-to-tr from-pink-500 via-indigo-500 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-400 rounded-full blur-2xl opacity-20" />
      <div className="relative z-10 flex flex-col min-h-screen">
       <Navbar />
      
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingLayout;
