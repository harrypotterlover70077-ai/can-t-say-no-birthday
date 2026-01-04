import { motion } from "framer-motion";
import catCute1 from "@/assets/cat-cute-1.png";
import catCute2 from "@/assets/cat-cute-2.png";
import catCute3 from "@/assets/cat-cute-3.png";

const FloatingCat = ({ 
  src, 
  className, 
  delay = 0,
  size = "w-16 h-16"
}: { 
  src: string; 
  className: string; 
  delay?: number;
  size?: string;
}) => (
  <motion.img
    src={src}
    alt="cute cat"
    className={`absolute ${size} object-contain pointer-events-none ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0],
      rotate: [-3, 3, -3]
    }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5, type: "spring" },
      y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
      rotate: { delay: delay + 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" }
    }}
  />
);

const FloatingHeart = ({ 
  className, 
  delay = 0,
  size = "text-2xl"
}: { 
  className: string; 
  delay?: number;
  size?: string;
}) => (
  <motion.span
    className={`absolute ${size} pointer-events-none ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.7, 1, 0.7], 
      scale: [1, 1.2, 1],
      y: [0, -10, 0]
    }}
    transition={{
      delay,
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    💕
  </motion.span>
);

const FloatingSparkle = ({ 
  className, 
  delay = 0 
}: { 
  className: string; 
  delay?: number;
}) => (
  <motion.span
    className={`absolute text-xl pointer-events-none ${className}`}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 180, 360]
    }}
    transition={{
      delay,
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    ✨
  </motion.span>
);

const catImages = [catCute1, catCute2, catCute3];

export const FloatingElements = ({ variant = "default" }: { variant?: "default" | "party" | "cake" }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating cats */}
      <FloatingCat src={catImages[0]} className="top-[10%] left-[5%]" delay={0} size="w-20 h-20" />
      <FloatingCat src={catImages[1]} className="top-[15%] right-[8%]" delay={0.3} size="w-16 h-16" />
      <FloatingCat src={catImages[2]} className="bottom-[20%] left-[8%]" delay={0.6} size="w-18 h-18" />
      <FloatingCat src={catImages[0]} className="bottom-[25%] right-[5%]" delay={0.9} size="w-14 h-14" />
      
      {variant === "party" && (
        <>
          <FloatingCat src={catImages[1]} className="top-[40%] left-[3%]" delay={0.2} size="w-12 h-12" />
          <FloatingCat src={catImages[2]} className="top-[50%] right-[3%]" delay={0.4} size="w-12 h-12" />
        </>
      )}

      {/* Floating hearts */}
      <FloatingHeart className="top-[25%] left-[15%]" delay={0.2} />
      <FloatingHeart className="top-[35%] right-[12%]" delay={0.5} size="text-3xl" />
      <FloatingHeart className="bottom-[35%] left-[20%]" delay={0.8} />
      <FloatingHeart className="bottom-[15%] right-[18%]" delay={1.1} size="text-xl" />
      <FloatingHeart className="top-[60%] left-[10%]" delay={1.4} />
      <FloatingHeart className="top-[70%] right-[8%]" delay={0.3} />

      {/* Sparkles */}
      <FloatingSparkle className="top-[20%] left-[25%]" delay={0} />
      <FloatingSparkle className="top-[30%] right-[20%]" delay={0.5} />
      <FloatingSparkle className="bottom-[30%] left-[30%]" delay={1} />
      <FloatingSparkle className="bottom-[40%] right-[25%]" delay={1.5} />
      <FloatingSparkle className="top-[50%] left-[5%]" delay={0.7} />
      <FloatingSparkle className="top-[45%] right-[5%]" delay={1.2} />
    </div>
  );
};
