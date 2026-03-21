import { format } from "date-fns";

export default function FullScreenClock({ time }) {
  const rawHours = time.getHours();
  // Convert standard time to 12-hour format for AM/PM usage
  const hours = (rawHours % 12 || 12).toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = rawHours >= 12 ? "PM" : "AM";

  const currentDate = new Date();

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-4 self-end">
          <h2 className="text-4xl font-light tracking-wide">{format(currentDate, "MMMM d, EEEE")}</h2>
        </div>

        <div className="flex items-center gap-2 text-[32vw] font-extralight tracking-tighter leading-none tabular-nums">
          <span className="-tracking-[2rem]">{hours}</span>
          <span className="mx-4 pb-[4vw]">:</span>
          <span className="-tracking-[2rem]">{minutes}</span>
          <span className="text-2xl self-end tracking-wider font-semibold text-white/50 pb-[6vw] uppercase">{ampm}</span>
        </div>
      </div>
    </div>
  );
}
