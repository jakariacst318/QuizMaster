import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [quizCounts, setQuizCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const categoryList = [
    {
      _id: "1",
      name: "SSC Preparation",
      slug: "ssc",
      icon: "🎓",
      description: "নবম-দশম শ্রেণির সকল বিষয়ের কুইজ সেট।",
    },
    {
      _id: "2",
      name: "HSC Preparation",
      slug: "hsc",
      icon: "📖",
      description: "একাদশ-দ্বাদশ শ্রেণির সকল বিষয়ের কুইজ সেট।",
    },
    {
      _id: "3",
      name: "Bank Job",
      slug: "bankJob",
      icon: "🏦",
      description: "ব্যাংক জব প্রস্তুতির জন্য গুরুত্বপূর্ণ কুইজ।",
    },
    {
      _id: "4",
      name: "Govt Job",
      slug: "govtJob",
      icon: "🏛️",
      description: "বিসিএস ও সরকারি চাকুরীর প্রস্তুতিমূলক কুইজ।",
    },
    {
      _id: "5",
      name: "Tech Quiz",
      slug: "techQuiz",
      icon: "💻",
      description: "প্রযুক্তি এবং প্রোগ্রামিং বিষয়ক কুইজ।",
    },
    {
      _id: "6",
      name: "Islamic Quiz",
      slug: "islamicQuiz",
      icon: "🌙",
      description: "ইসলামিক জীবন ব্যবস্থা ও ইতিহাস ভিত্তিক কুইজ।",
    },
    {
      _id: "7",
      name: "IQ Test",
      slug: "iQTest",
      icon: "🧠",
      description: "আপনার বুদ্ধিমত্তা যাচাই করার জন্য বিশেষ কুইজ।",
    },
    {
      _id: "8",
      name: "Fun Quiz",
      slug: "funQuiz",
      icon: "🎮",
      description: "মজার মজার সাধারণ জ্ঞান ও বিনোদন কুইজ।",
    },
    {
      _id: "9",
      name: "WELDING",
      slug: "welding",
      icon: "👨‍🏭",
      description: "ওয়েল্ডিং ও ফ্যাব্রিকেশন বিষয়ক কুইজ",
    },
  ];

  useEffect(() => {
    setCategories(categoryList);

    // প্রতিটি JSON ফাইল থেকে কুইজ সংখ্যা বের করা
    categoryList.forEach((cat) => {
      fetch(`/${cat.slug}.json`)
        .then((res) => res.json())
        .then((data) => {
          const count = data[0]?.quizzes?.length || 0;
          setQuizCounts((prev) => ({ ...prev, [cat.slug]: count }));
        })
        .catch(() => {
          setQuizCounts((prev) => ({ ...prev, [cat.slug]: 0 }));
        });
    });

    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="text-white text-center mt-20 font-black">
        লোড হচ্ছে বস...
      </div>
    );

  return (
    <div className="pb-20">
      <section className="relative py-20 px-4 text-center overflow-hidden">
        {" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {" "}
          <span className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-500/20 mb-6 inline-block">
            নতুন কুইজ যুক্ত করা হয়েছে! ✨{" "}
          </span>{" "}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            আপনার মেধা{" "}
            <span className="text-indigo-500 text-gradient">
              যাচাই করুন!
            </span>{" "}
          </h1>{" "}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ডিজিটাল কুইজ প্ল্যাটফর্মে অংশ নিন, নিজেকে অন্যদের চেয়ে এগিয়ে রাখুন
            এবং মেধার স্বাক্ষর রাখুন।{" "}
          </p>{" "}
        </motion.div>{" "}
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} // একবার লোড হলে আর বারবার হবে না
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }} // কার্ডটি ১০ পিক্সেল উপরে উঠবে
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative block h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.07] transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Hover Glow Effect: পেছনের ঝাপসা আলো */}
                <div className="absolute -top-[20%] -right-[20%] w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px] group-hover:bg-indigo-600/30 transition-all duration-700" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Animation: হোভার করলে আইকন একটু বড় হবে */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all"
                  >
                    {cat.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/5 px-4 py-2 rounded-full border border-indigo-400/10 group-hover:bg-indigo-400/20 transition-all">
                      {quizCounts[cat.slug] !== undefined
                        ? `${quizCounts[cat.slug]} কুইজ সেট `
                        : "লোড হচ্ছে..."}
                    </span>

                    <div className="flex items-center gap-2 text-white font-black group-hover:gap-4 transition-all">
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Start
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                        <HiArrowRight className="text-indigo-500 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
