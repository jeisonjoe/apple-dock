import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalendarWidget from "./widgets/CalendarWidget";
import WeatherWidget from "./widgets/WeatherWidget";
import TaskWidget from "./widgets/TaskWidget";

const widgets = [
  <CalendarWidget key="calendar" />,
  <WeatherWidget key="weather" />,
  <TaskWidget key="task" />,
];

export default function SmartStack({ isNightMode }) {
  const [index, setIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    // If we dragged up enough vertically
    if (info.offset.y < -50) {
      setIndex((prevIndex) => (prevIndex + 1) % widgets.length);
    }
    // If we dragged down enough vertically
    else if (info.offset.y > 50) {
      setIndex((prevIndex) => (prevIndex - 1 + widgets.length) % widgets.length);
    }
  };

  return (
    <div className={`relative w-full h-[85%] rounded-[3rem] bg-[#1c1c1e] overflow-hidden flex items-center justify-center transition-colors duration-1000 ${isNightMode ? 'bg-black/80' : ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing w-full h-full"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {widgets[index]}
        </motion.div>
      </AnimatePresence>
      
      {/* Smart Stack Dots Indicator */}
      <div className="absolute right-4 flex flex-col gap-2">
        {widgets.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
