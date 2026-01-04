import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const confettiColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--gold))",
  "hsl(var(--heart-pink))",
  "hsl(var(--rose-medium))",
];

const confettiEmojis = ["🎉", "🎊", "💕", "✨", "🐱", "💖", "🎂", "🥳"];

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  emoji: string;
  size: number;
}

export const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        size: 1 + Math.random() * 1.5,
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            fontSize: `${piece.size}rem`,
          }}
          initial={{ y: -100, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: 720,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
          }}
        >
          {piece.emoji}
        </motion.div>
      ))}
    </div>
  );
};
