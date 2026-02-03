import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#020617] font-sans selection:bg-indigo-500 selection:text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/15 blur-[130px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Root;
