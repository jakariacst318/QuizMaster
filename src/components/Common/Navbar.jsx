import { useState } from "react";
import { Link } from "react-router"; // smooth routing এর জন্য Link ব্যবহার করো
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineQuiz } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 🔥 গ্লাস ইফেক্ট: bg-white/5 এবং backdrop-blur
    <nav className="sticky top-0 z-[100] bg-[#020617]/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 🚀 Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-transform duration-300">
              <MdOutlineQuiz className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              Quiz<span className="text-indigo-500">Master</span>
            </span>
          </Link>

          {/* 💻 Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-bold text-gray-300">
            <Link to="/" className="hover:text-white transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/leaderboard" className="hover:text-white transition-colors relative group">
              Leaderboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
            <button className="bg-white text-[#020617] px-8 py-2.5 rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all duration-300 active:scale-95 shadow-lg shadow-white/5">
              Login
            </button>
          </div>

          {/* 📱 Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white text-3xl transition-all"
            >
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#020617]/95 backdrop-blur-2xl border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 text-lg font-bold hover:text-indigo-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/leaderboard" 
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 text-lg font-bold hover:text-indigo-500 transition-colors"
          >
            Leaderboard
          </Link>
          <div className="pt-4">
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/20">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;