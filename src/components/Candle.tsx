import { motion, AnimatePresence } from "framer-motion";

interface CandleProps {
  isLit: boolean;
  onBlow: () => void;
  index: number;
}

export const Candle = ({ isLit, onBlow, index }: CandleProps) => {
  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer"
      onClick={onBlow}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="relative mb-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-4 bg-gold-light/30 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            
            {/* Flame body */}
            <motion.div
              className="relative w-4 h-8 rounded-full bg-gradient-to-t from-cat-orange via-gold to-gold-light"
              style={{
                clipPath: "ellipse(50% 100% at 50% 100%)",
                filter: "drop-shadow(0 0 8px hsl(var(--gold)))"
              }}
              animate={{
                scaleY: [1, 1.1, 0.95, 1],
                scaleX: [1, 0.9, 1.05, 1],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            
            {/* Inner flame */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-gradient-to-t from-gold-light to-cream"
              style={{
                clipPath: "ellipse(50% 100% at 50% 100%)",
              }}
              animate={{
                scaleY: [1, 1.15, 0.9, 1],
              }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Smoke when blown out */}
      <AnimatePresence>
        {!isLit && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-xl">💨</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Candle body */}
      <div className="w-3 h-12 bg-gradient-to-b from-rose-medium to-primary rounded-t-sm rounded-b-lg shadow-md">
        {/* Wick */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-foreground/80 rounded-full" />
      </div>
    </motion.div>
  );
};
