import { useEffect, useState } from "react";
import { CloudRain, Sun, Moon, Cloud, CloudLightning, CloudSnow, CloudFog } from "lucide-react";

const WMO_CODES = {
  0: { label: "Clear", icon: 'clear' },
  1: { label: "Mainly Clear", icon: 'clear' },
  2: { label: "Partly Cloudy", icon: 'cloud' },
  3: { label: "Overcast", icon: 'cloud' },
  45: { label: "Fog", icon: 'fog' },
  48: { label: "Fog", icon: 'fog' },
  51: { label: "Drizzle", icon: 'rain' },
  53: { label: "Drizzle", icon: 'rain' },
  55: { label: "Drizzle", icon: 'rain' },
  56: { label: "Freezing Drizzle", icon: 'rain' },
  57: { label: "Freezing Drizzle", icon: 'rain' },
  61: { label: "Rain", icon: 'rain' },
  63: { label: "Rain", icon: 'rain' },
  65: { label: "Heavy Rain", icon: 'rain' },
  66: { label: "Freezing Rain", icon: 'rain' },
  67: { label: "Freezing Rain", icon: 'rain' },
  71: { label: "Snow", icon: 'snow' },
  73: { label: "Snow", icon: 'snow' },
  75: { label: "Heavy Snow", icon: 'snow' },
  77: { label: "Snow Grains", icon: 'snow' },
  80: { label: "Rain Showers", icon: 'rain' },
  81: { label: "Rain Showers", icon: 'rain' },
  82: { label: "Heavy Showers", icon: 'rain' },
  85: { label: "Snow Showers", icon: 'snow' },
  86: { label: "Snow Showers", icon: 'snow' },
  95: { label: "Thunderstorm", icon: 'thunder' },
  96: { label: "Thunderstorm", icon: 'thunder' },
  99: { label: "Thunderstorm", icon: 'thunder' },
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("Local Weather");
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const geoData = await geoRes.json();
            if (geoData.city || geoData.locality) {
              setLocationName(geoData.city || geoData.locality);
            }

            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,weather_code,cloud_cover&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=auto`);
            const weatherData = await weatherRes.json();
            setWeather(weatherData);
          } catch (err) {
            setError("Failed to fetch weather");
          }
        },
        (err) => {
          setError("Location access denied. Please enable location permissions.");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  const currentHour = new Date().getHours();
  const isNight = weather ? !weather.current.is_day : (currentHour >= 18 || currentHour < 6);

  if (error && !weather) {
    return (
      <div className="w-full h-full p-8 flex flex-col justify-between text-white pointer-events-none select-none relative overflow-hidden">
        <h2 className="text-3xl font-medium tracking-wide">Weather</h2>
        <div className="flex flex-col flex-1 items-center justify-center text-center">
            <p className="text-2xl text-white/70">{error}</p>
        </div>
      </div>
    );
  }

  const temp = weather ? Math.round(weather.current.temperature_2m) : null;
  const high = weather ? Math.round(weather.daily.temperature_2m_max[0]) : null;
  const low = weather ? Math.round(weather.daily.temperature_2m_min[0]) : null;
  const precipProb = weather ? weather.daily.precipitation_probability_max[0] : null;
  
  const weatherCode = weather ? weather.current.weather_code : 0;
  const wmoInfo = WMO_CODES[weatherCode] || { label: "Unknown", icon: 'cloud' };

  let WeatherIcon = Cloud;
  switch (wmoInfo.icon) {
    case 'clear':
      WeatherIcon = isNight ? Moon : Sun;
      break;
    case 'cloud':
      WeatherIcon = Cloud;
      break;
    case 'fog':
      WeatherIcon = CloudFog;
      break;
    case 'rain':
      WeatherIcon = CloudRain;
      break;
    case 'snow':
      WeatherIcon = CloudSnow;
      break;
    case 'thunder':
      WeatherIcon = CloudLightning;
      break;
  }

  return (
    <div className="w-full h-full p-8 flex flex-col justify-between text-white pointer-events-none select-none relative overflow-hidden">
      <div className="flex items-center gap-3 relative z-10 w-full">
        <h2 className="text-3xl font-medium tracking-wide truncate w-full">{locationName}</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 relative z-10 min-h-[160px]">
        {weather ? (
          <>
            <div className="flex items-center gap-6">
              <WeatherIcon className={`w-24 h-24 ${isNight ? 'text-white/90' : (wmoInfo.icon === 'clear' ? 'text-yellow-400' : 'text-white/90')}`} />
              <span className="text-[7rem] font-bold leading-none tracking-tighter">{temp}°</span>
            </div>
            <p className="text-3xl font-medium mt-4 text-white/80">{wmoInfo.label}</p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-pulse w-24 h-24 bg-white/20 rounded-full" />
            <div className="animate-pulse w-32 h-8 bg-white/20 rounded-md" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-end relative z-10 opacity-70 border-t border-white/20 pt-4 mt-6">
        <div className="flex flex-col">
          <span className="text-xl font-medium">
            {weather ? `H: ${high}° L: ${low}°` : 'H: --° L: --°'}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <CloudRain className="w-6 h-6" />
          <span className="text-xl font-bold">{weather ? `${precipProb}%` : '--%'}</span>
        </div>
      </div>
    </div>
  );
}
