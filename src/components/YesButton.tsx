import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface YesButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export const YesButton = ({ onClick, children = "Yes! 💕" }: YesButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        size="lg"
        className="text-lg px-10 py-6 font-body font-bold bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary shadow-float transition-all duration-300"
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  );
};
