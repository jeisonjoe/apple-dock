import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export default function CalendarWidget() {
  const currentDate = new Date();
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // padding for the first day
  const startDay = getDay(start); // 0 (Sun) to 6 (Sat)
  const emptyDays = Array.from({ length: startDay }).map((_, i) => null);

  const allDays = [...emptyDays, ...days];

  return (
    <div className="w-full h-full flex flex-col p-8 text-white/90 select-none pointer-events-none">
      <div className="flex items-baseline gap-4 mb-20">
        <CalendarIcon className="w-8 h-8 opacity-80" />
        <h2 className="text-4xl font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1 flex-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={`header-${i}`} className="text-center font-bold text-white/50 text-xl font-mono">
            {day}
          </div>
        ))}

        {allDays.map((date, i) => {
          if (!date) return <div key={i} className="text-center" />;

          const today = isToday(date);

          return (
            <div
              key={i}
              className={`flex items-center justify-center font-medium text-2xl relative z-10`}
            >
              {today && (
                <div className="absolute inset-0 bg-white/5 rounded-full -z-10" />
              )}
              <span className={`${today ? 'text-[#ff3b30]' : 'text-white/90'}`}>
                {format(date, "d")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
