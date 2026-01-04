import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingElements } from "@/components/FloatingElements";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { BirthdayCake } from "@/components/BirthdayCake";
import { CelebrationScreen } from "@/components/CelebrationScreen";

// Customize these questions for your fiancée!
const questions = [
  {
    question: "Do you know that you're the most beautiful person in the world?",
    catEmoji: "😻",
  },
  {
    question: "Will you accept a million kisses from me today?",
    catEmoji: "😽",
  },
  {
    question: "Do you promise to let me spoil you on your special day?",
    catEmoji: "🐱",
  },
  {
    question: "Will you be my forever cuddle buddy?",
    catEmoji: "🥰",
  },
  {
    question: "Do you love me as much as cats love naps?",
    catEmoji: "😸",
  },
  {
    question: "Are you ready to make a birthday wish?",
    catEmoji: "✨",
  },
];

type Screen = "welcome" | "questions" | "cake" | "celebration";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = () => {
    setCurrentScreen("questions");
  };

  const handleYes = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentScreen("cake");
    }
  };

  const handleCandlesBlown = () => {
    setCurrentScreen("celebration");
  };

  const getVariant = () => {
    if (currentScreen === "celebration") return "party";
    if (currentScreen === "cake") return "cake";
    return "default";
  };

  return (
    <div className="min-h-screen bg-romantic overflow-hidden relative">
      <FloatingElements variant={getVariant()} />
      
      {/* Progress dots for questions */}
      {currentScreen === "questions" && (
        <motion.div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {questions.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentQuestion 
                  ? "bg-primary shadow-glow" 
                  : "bg-muted"
              }`}
              animate={index === currentQuestion ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <WelcomeScreen onStart={handleStart} name="My Love" />
          </motion.div>
        )}

        {currentScreen === "questions" && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <QuestionCard
              question={questions[currentQuestion].question}
              catEmoji={questions[currentQuestion].catEmoji}
              onYes={handleYes}
            />
          </motion.div>
        )}

        {currentScreen === "cake" && (
          <motion.div
            key="cake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BirthdayCake onAllCandlesBlown={handleCandlesBlown} />
          </motion.div>
        )}

        {currentScreen === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CelebrationScreen name="My Love" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
