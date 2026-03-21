import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClockWidget from "./components/ClockWidget";
import SmartStack from "./components/SmartStack";
import FullScreenClock from "./components/FullScreenClock";
import { cn } from "./utils";

export default function App() {
  const [time, setTime] = useState(new Date());

  // 0: Dual Widgets, 1: Full Screen Clock
  const [viewIndex, setViewIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Update every second to keep the clock pulsing and accurate
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = time.getHours();
  // Time is between 8 PM and 6 AM
  const isNightMode = currentHour >= 20 || currentHour < 6;

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && viewIndex === 0) {
      // Swiping Left: show next view (index 1)
      setDirection(1);
      setViewIndex(1);
    } else if (info.offset.x > swipeThreshold && viewIndex === 1) {
      // Swiping Right: show previous view (index 0)
      setDirection(-1);
      setViewIndex(0);
    }
  };

  const variants = {
    initial: (dir) => ({
      x: dir > 0 ? "100vw" : "-100vw",
      opacity: 0,
      scale: 0.95
    }),
    active: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? "100vw" : "-100vw",
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div
      className={cn(
        "w-screen h-screen bg-black transition-colors duration-1000 overflow-hidden relative text-white/75"
      )}
    >
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          {viewIndex === 0 && (
            <motion.div
              key="dual"
              custom={direction}
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 flex flex-row p-8 gap-8 items-center justify-center"
            >
              <div className="flex-1 h-full flex items-center justify-center">
                <ClockWidget time={time} isNightMode={isNightMode} />
              </div>
              <div className="flex-1 flex items-center justify-center h-[90%]">
                <SmartStack isNightMode={isNightMode} />
              </div>
            </motion.div>
          )}

          {viewIndex === 1 && (
            <motion.div
              key="fullscreen"
              custom={direction}
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              <FullScreenClock time={time} isNightMode={isNightMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Interactive Area */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center p-8 z-50 group">
        {/* Horizontal Page Indication Dots */}
        <div className="flex justify-center gap-3 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none mb-1">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${viewIndex === 0 ? "bg-white/90" : "bg-white/30"}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${viewIndex === 1 ? "bg-white/90" : "bg-white/30"}`} />
        </div>

        {/* Fullscreen Prompt Text */}
        <span className="absolute right-8 bottom-8 text-white/50 text-sm tracking-wide font-medium transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none mb-1">
          Press F11 to toggle fullscreen
        </span>
      </div>
    </div>
  );
}
