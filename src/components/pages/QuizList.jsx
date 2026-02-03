import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { HiOutlineArrowLeft, HiOutlinePlay } from "react-icons/hi";
import { motion } from "framer-motion";

const QuizList = () => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => {        
        const content = Array.isArray(data) ? data[0] : data;
        setCategoryData(content);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(true);
      });
  }, [slug]);

  if (error)
    return (
      <div className="text-white text-center mt-20 font-bold text-xl text-red-500">
        ডাটা লোড করতে ব্যর্থ! ফাইলটি চেক করুন বস।
      </div>
    );
  if (!categoryData)
    return (
      <div className="text-white text-center mt-20 font-bold">লোডিং...</div>
    );

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[45px] shadow-2xl text-center border border-white/10"
      >
        <div className="text-7xl mb-6 bg-white/5 p-6 rounded-[30px] inline-block">
          {categoryData.icon}
        </div>
        <h1 className="text-3xl font-black text-white mb-3">
          {categoryData.name} প্রস্তুতি
        </h1>
        <p className="text-indigo-400 font-bold mb-6 tracking-widest uppercase">
          {categoryData.quizzes?.length || 0} টি কুইজ সেট উপলব্ধ
        </p>
        {/* এখানে category/${slug} এর জায়গায় /play/${slug} হবে */}
        <Link
          to={`/play/${slug}`}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-full py-4 rounded-[22px] text-xl font-black shadow-lg shadow-indigo-500/20"
        >
          Start Quiz <HiOutlinePlay size={24} />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 text-gray-500 font-bold hover:text-white transition-colors"
        >
          <HiOutlineArrowLeft /> ফিরে যান
        </Link>
      </motion.div>
    </div>
  );
};

export default QuizList;
