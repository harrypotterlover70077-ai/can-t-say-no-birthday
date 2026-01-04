import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Candle } from "./Candle";
import cakeImage from "@/assets/birthday-cake.png";

interface BirthdayCakeProps {
  onAllCandlesBlown: () => void;
}

export const BirthdayCake = ({ onAllCandlesBlown }: BirthdayCakeProps) => {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isListening, setIsListening] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const blowCandle = useCallback((index?: number) => {
    setCandles(prev => {
      const newCandles = [...prev];
      if (index !== undefined) {
        newCandles[index] = false;
      } else {
        // Blow out first lit candle
        const litIndex = newCandles.findIndex(c => c);
        if (litIndex !== -1) {
          newCandles[litIndex] = false;
        }
      }
      return newCandles;
    });
    setShowHint(false);
  }, []);

  // Check if all candles are blown
  useEffect(() => {
    if (candles.every(c => !c)) {
      setTimeout(onAllCandlesBlown, 500);
    }
  }, [candles, onAllCandlesBlown]);

  // Microphone detection for blowing
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let animationId: number;

    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        const checkVolume = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          
          // If loud enough (blowing), extinguish a candle
          if (average > 50) {
            blowCandle();
          }
          
          animationId = requestAnimationFrame(checkVolume);
        };
        
        checkVolume();
        setIsListening(true);
      } catch (err) {
        console.log("Microphone not available, using click to blow");
      }
    };

    startListening();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (audioContext) audioContext.close();
    };
  }, [blowCandle]);

  const litCount = candles.filter(c => c).length;

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl text-foreground mb-8 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Make a Wish! ✨
      </motion.h2>

      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        {/* Candles row */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-6 z-10">
          {candles.map((isLit, index) => (
            <Candle
              key={index}
              isLit={isLit}
              onBlow={() => blowCandle(index)}
              index={index}
            />
          ))}
        </div>

        {/* Cake image */}
        <motion.img
          src={cakeImage}
          alt="Birthday Cake"
          className="w-72 md:w-96 h-auto drop-shadow-2xl"
          animate={{
            y: [0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Glow effect */}
        <AnimatePresence>
          {litCount > 0 && (
            <motion.div
              className="absolute inset-0 -z-10 bg-gold/20 rounded-full blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: litCount / 5 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instructions */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="font-body text-lg text-foreground mb-2">
              {isListening ? "🎤 Blow into your microphone!" : "👆 Tap the candles to blow them out!"}
            </p>
            <p className="text-sm text-muted-foreground">
              ({litCount} candle{litCount !== 1 ? 's' : ''} remaining)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!showHint && litCount > 0 && (
        <motion.p
          className="mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {litCount} more to go! Keep blowing! 🌬️
        </motion.p>
      )}
    </motion.div>
  );
};
