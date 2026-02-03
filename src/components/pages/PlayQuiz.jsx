import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowRight, HiCheckCircle, HiXCircle } from "react-icons/hi";
import confetti from "canvas-confetti"; // কনফেটি ইমপোর্ট

const PlayQuiz = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  // ডাটা ফেচ করা
  useEffect(() => {
    fetch(`/${categorySlug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("JSON ফাইল খুঁজে পাওয়া যায়নি!");
        return res.json();
      })
      .then((data) => {
        const categoryObject = Array.isArray(data) ? data[0] : data;
        if (categoryObject && categoryObject.quizzes) {
          const questions = categoryObject.quizzes.reduce((acc, q) => {
            return acc.concat(q.questions || []);
          }, []);
          setAllQuestions(questions);
        }
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, [categorySlug]);

  // অপশন সাফল করা
  useEffect(() => {
    if (allQuestions.length > 0 && currentIdx < allQuestions.length) {
      const currentQ = allQuestions[currentIdx];
      if (currentQ?.options) {
        setShuffledOptions(
          [...currentQ.options].sort(() => Math.random() - 0.5),
        );
      }
    }
  }, [allQuestions, currentIdx]);

  // টাইমার লজিক
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
    }
  }, [timeLeft, isAnswered, showResult]);

  // কুইজ শেষ হলে কনফেটি ইফেক্ট
  useEffect(() => {
    if (showResult) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
  }, [showResult]);

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
    return (
      <div className="text-white text-center mt-20 font-black">
        লোড হচ্ছে...
      </div>
    );

  if (showResult) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-[#1e1b4b] rounded-[40px] text-center border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-black text-indigo-400 mb-4">
          কুইজ রিপোর্ট! 🏆
        </h2>
        <h1 className="text-6xl font-black text-white">
          {score}{" "}
          <span className="text-2xl text-gray-500">
            / {allQuestions.length}
          </span>
        </h1>
        <button
          onClick={() => navigate("/")}
          className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-colors"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  const currentQ = allQuestions[currentIdx];
  const progress = ((currentIdx + 1) / allQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4 mb-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] p-6  rounded-[40px] border border-white/10 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-indigo-400 font-black text-xs uppercase tracking-widest">
              প্রশ্ন {currentIdx + 1} / {allQuestions.length}
            </span>
            <span
              className={`text-2xl font-black ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-indigo-400"}`}
            >
              ⏱ {timeLeft}s
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-2 rounded-full mb-2 overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-relaxed">
            {currentQ?.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {shuffledOptions.map((option, i) => (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left p-2  ps-4 rounded-2xl border-2 font-medium transition-all flex justify-between items-center ${
                  isAnswered
                    ? option === currentQ.answer
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : option === selectedOption
                        ? "bg-rose-500/20 border-rose-500 text-rose-400"
                        : "opacity-20 border-transparent"
                    : "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span>{option}</span>
                {isAnswered && option === currentQ.answer && (
                  <HiCheckCircle size={28} className="text-emerald-500" />
                )}
                {isAnswered &&
                  option === selectedOption &&
                  option !== currentQ.answer && (
                    <HiXCircle size={28} className="text-red-500" />
                  )}
              </button>
            ))}
          </div>

          {isAnswered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-10 cursor-pointer
 w-full bg-indigo-600 text-white p-3 rounded-2xl font-black text-lg flex justify-center items-center gap-3 shadow-lg shadow-indigo-600/30"
            >
              {currentIdx + 1 === allQuestions.length
                ? "ফলাফল দেখুন"
                : "পরবর্তী প্রশ্ন"}{" "}
              <HiOutlineArrowRight />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PlayQuiz;
