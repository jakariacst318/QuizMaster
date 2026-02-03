import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowRight, HiCheckCircle, HiXCircle } from "react-icons/hi";

const PlayQuiz = () => {
  const { categorySlug } = useParams(); // আমরা শুধু ক্যাটাগরি স্ল্যাগ ব্যবহার করবো
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    fetch("/quizzes.json")
      .then((res) => res.json())
      .then((data) => {
        const category = data.find((cat) => cat.slug === categorySlug);
        if (category) {
          // 🔥 ম্যাজিক লাইন: ক্যাটাগরির সব কুইজের প্রশ্নগুলোকে একটা লিস্টে নিয়ে আসা
          const combinedQuestions = category.quizzes.flatMap(
            (quiz) => quiz.questions,
          );
          setAllQuestions(combinedQuestions);
        }
      });
  }, [categorySlug]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
    }
  }, [timeLeft, isAnswered, showResult]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === allQuestions[currentIdx].answer) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 < allQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setShowResult(true);
    }
  };

  if (allQuestions.length === 0)
    return <div className="text-center p-20 font-bold">প্রসেসিং হচ্ছে...</div>;

  if (showResult) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[40px] shadow-2xl text-center border">
        <h2 className="text-3xl font-black text-indigo-600 mb-4">
          কুইজ রিপোর্ট! 🏆
        </h2>
        <div className="bg-indigo-50 py-10 rounded-3xl mb-8">
          <h1 className="text-6xl font-black text-indigo-700">
            {score}{" "}
            <span className="text-2xl text-indigo-300">
              / {allQuestions.length}
            </span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">সঠিক উত্তর দিয়েছেন</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  const currentQ = allQuestions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto p-4 mb-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          // 🔥 নতুন প্রিমিয়াম কালার: Deep Navy to Royal Purple Gradient
          className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/20"
        >
          {/* প্রশ্ন সেকশন: ফ্রেশ লুক */}
          <div className="flex justify-between items-center px-2 font-bold">
            <span className="text-gray-500 uppercase tracking-widest text-sm">
              প্রশ্ন {currentIdx + 1} / {allQuestions.length}
            </span>
            <span
              className={`text-2xl font-black ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-indigo-600"}`}
            >
              ⏱ {timeLeft}s
            </span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              <span className="text-gray-600">MCQ:</span> {currentQ.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option, i) => {
              const isCorrect = option === currentQ.answer;
              const isSelected = option === selectedOption;

              // 🎨 ডাইনামিক গ্লাস স্টাইল
              let style =
                "bg-white/10 border-white/10 text-gray-100 hover:bg-white/20 hover:border-indigo-400";

              if (isAnswered) {
                if (isCorrect)
                  style =
                    "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]";
                else if (isSelected)
                  style =
                    "bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]";
                else style = "opacity-20 border-transparent text-gray-500";
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left py-2 px-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 flex justify-between items-center group active:scale-95 ${style}`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-colors ${isAnswered && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" : "border-white/20 bg-white/5"}`}
                    >
                      {i + 1}
                    </span>
                    {option}
                  </span>

                  {isAnswered && isCorrect && (
                    <HiCheckCircle
                      size={30}
                      className="text-emerald-500 animate-pulse"
                    />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <HiXCircle size={30} className="text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* নেক্সট বাটন: ভাইব্রেন্ট ফিনিশ */}
          {isAnswered && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={handleNext}
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-2xl font-black text-lg flex justify-center items-center gap-3 hover:from-cyan-400 hover:to-blue-500 shadow-2xl transition-all"
            >
              {currentIdx + 1 === allQuestions.length
                ? "ফলাফল দেখুন 🏆"
                : "পরবর্তী প্রশ্ন 🚀"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PlayQuiz;
