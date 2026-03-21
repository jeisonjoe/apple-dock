import { motion } from "framer-motion";

export default function ClockWidget({ time, isNightMode }) {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className={`w-full h-[85%] rounded-[3rem] bg-black flex flex-col items-center justify-center transition-colors duration-1000 ${isNightMode ? 'bg-black/80' : ''}`}>
      <div className="flex items-baseline text-[12vw] leading-none font-black tracking-tighter select-none tabular-nums">
        <span>{hours}</span>
        <span>:</span>
        {/* <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="mx-1 pb-[1vw]"
        >
        </motion.span> */}
        <span>{minutes}</span>
      </div>
    </div>
  );
}
