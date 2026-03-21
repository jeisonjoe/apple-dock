import { CloudRain, Sun, Moon, Cloud } from "lucide-react";

export default function WeatherWidget() {
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 18 || currentHour < 6;
  
  return (
    <div className="w-full h-full p-8 flex flex-col justify-between text-white pointer-events-none select-none relative overflow-hidden">
      <div className="flex items-center gap-3 relative z-10">
        <h2 className="text-3xl font-medium tracking-wide">Cupertino</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 relative z-10">
        <div className="flex items-center gap-6">
          {isNight ? (
             <Moon className="w-24 h-24 text-white/90" />
          ) : (
             <Sun className="w-24 h-24 text-yellow-400" />
          )}
          <span className="text-[7rem] font-bold leading-none tracking-tighter">72°</span>
        </div>
        <p className="text-3xl font-medium mt-4 text-white/80">Partly Cloudy</p>
      </div>

      <div className="flex justify-between items-end relative z-10 opacity-70 border-t border-white/20 pt-4 mt-6">
        <div className="flex flex-col">
          <span className="text-xl font-medium">H: 82° L: 61°</span>
        </div>
        <div className="flex gap-2 items-center">
          <CloudRain className="w-6 h-6" />
          <span className="text-xl font-bold">12%</span>
        </div>
      </div>
    </div>
  );
}
