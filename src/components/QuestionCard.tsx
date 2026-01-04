import { motion } from "framer-motion";
import { RunawayButton } from "./RunawayButton";
import { YesButton } from "./YesButton";

interface QuestionCardProps {
  question: string;
  catEmoji?: string;
  onYes: () => void;
}

export const QuestionCard = ({ question, catEmoji = "🐱", onYes }: QuestionCardProps) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-float max-w-lg w-full text-center border border-rose-medium/30"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ 
            rotate: [-5, 5, -5],
            y: [0, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {catEmoji}
        </motion.div>
        
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
          {question}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center min-h-[100px]">
          <YesButton onClick={onYes} />
          <RunawayButton>No 🙈</RunawayButton>
        </div>
        
        <motion.p
          className="mt-6 text-muted-foreground text-sm font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          (Try clicking No... if you can! 😸)
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
