import { motion } from "framer-motion";
import { Confetti } from "./Confetti";
import catParty from "@/assets/cat-party.png";

interface CelebrationScreenProps {
  name?: string;
}

export const CelebrationScreen = ({ name = "My Love" }: CelebrationScreenProps) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
      <Confetti />
      
      <motion.div
        className="text-center max-w-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <motion.img
          src={catParty}
          alt="Party Cat"
          className="w-48 h-48 mx-auto mb-8 object-contain"
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.h1
          className="font-display text-4xl md:text-6xl text-foreground mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Happy Birthday! 🎂
        </motion.h1>

        <motion.p
          className="font-display text-2xl md:text-3xl text-primary mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {name}! 💕
        </motion.p>

        <motion.div
          className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-float border border-rose-medium/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-4">
            You are the most amazing person in my life! 
            Every day with you feels like a gift. 🎁
          </p>
          <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-4">
            May all your wishes come true! ✨
          </p>
          <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">
            I love you more than all the cats in the world! 🐱💖
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center gap-4 text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {["💕", "🐱", "🎂", "✨", "💖"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
