import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import catCute1 from "@/assets/cat-cute-1.png";

interface WelcomeScreenProps {
  onStart: () => void;
  name?: string;
}

export const WelcomeScreen = ({ onStart, name = "My Love" }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={catCute1}
        alt="Cute Cat"
        className="w-40 h-40 mb-8 object-contain"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -10, 0]
        }}
        transition={{
          scale: { type: "spring", duration: 0.8 },
          y: { duration: 2, repeat: Infinity }
        }}
      />

      <motion.h1
        className="font-display text-4xl md:text-6xl text-foreground text-center mb-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Hey {name}! 💕
      </motion.h1>

      <motion.p
        className="font-body text-xl md:text-2xl text-muted-foreground text-center mb-8 max-w-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        I have something special for you today... 🎁✨
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="text-xl px-12 py-8 font-display bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary shadow-float transition-all duration-300"
        >
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Open My Gift! 🎀
          </motion.span>
        </Button>
      </motion.div>

      <motion.div
        className="mt-12 flex gap-4 text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {["🐱", "💕", "🎂", "✨", "🐱"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -8, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};
