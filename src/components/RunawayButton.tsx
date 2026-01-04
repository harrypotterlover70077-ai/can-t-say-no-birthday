import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface RunawayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const RunawayButton = ({ children, onClick }: RunawayButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isScared, setIsScared] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const moveCount = useRef(0);

  const runAway = () => {
    moveCount.current += 1;
    setIsScared(true);
    
    // Get viewport dimensions
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    
    // Random position within bounds
    const newX = (Math.random() - 0.5) * Math.min(400, maxX * 0.6);
    const newY = (Math.random() - 0.5) * Math.min(300, maxY * 0.4);
    
    setPosition({ x: newX, y: newY });
    
    setTimeout(() => setIsScared(false), 300);
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        ref={buttonRef}
        variant="destructive"
        size="lg"
        className="relative text-lg px-8 py-6 font-body font-bold"
        onMouseEnter={runAway}
        onTouchStart={runAway}
        onClick={onClick}
      >
        <motion.span
          animate={isScared ? { scale: [1, 0.8, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        {isScared && (
          <motion.span
            className="absolute -top-6 left-1/2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            😱
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
};
