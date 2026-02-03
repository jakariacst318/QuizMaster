import { FaFacebook,  FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative mt-0 border-t border-white/5 pt-16 pb-10 overflow-hidden">
      {/* ফুটারেও হালকা একটা গ্লো ইফেক্ট দিতে পারো */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* 🏢 About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black text-white mb-6 tracking-tighter">
              Quiz<span className="text-indigo-500">Master</span>
            </h3>
            <p className="text-gray-500 leading-relaxed max-w-sm text-lg">
              বাংলাদেশের সেরা ডিজিটাল কুইজ প্ল্যাটফর্ম। আধুনিক ইন্টারফেসে নিজের মেধাকে শাণিত করুন এবং মেধার দৌড়ে সবার চেয়ে এগিয়ে থাকুন।
            </p>
          </div>

          {/* 🔗 Quick Links */}
          <div>
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-6">
              Explore
            </h3>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Job Preparation</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">SSC / HSC Prep</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Islamic Quiz</Link>
              </li>
            </ul>
          </div>

          {/* 📱 Social Connect */}
          <div>
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-6">
              Connect
            </h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, color: "hover:bg-blue-600", link: "https://www.facebook.com/js.jakaria42" },
                { icon: <FaLaptopCode />, color: "hover:bg-gray-500", link: "https://dev-jakaria-hossain.netlify.app/" },
                { icon: <FaYoutube />, color: "hover:bg-red-600", link: "#" },
                { icon: <FaLinkedin />, color: "hover:bg-blue-500", link: "#"  },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1 shadow-lg`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* 📜 Copyright Section */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-medium">
            © {new Date().getFullYear()} <span className="text-gray-400">QuizMaster</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <a href="https://dev-jakaria-hossain.netlify.app/" target="_blank" className="text-gray-600 text-sm italic">
            Developed with <span className="text-rose-500 animate-pulse">❤️</span> <span className="text-lg"> Jakaria.</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;