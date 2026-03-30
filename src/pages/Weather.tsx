import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Wind, Eye, Thermometer, Sunrise, Loader2 } from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";
import { fetchWeatherByCity, fetchWeatherByCoords, type WeatherData } from "@/lib/weather";

const Weather = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const city = params.get("city");
    const lat = params.get("lat");
    const lon = params.get("lon");

    setLoading(true);
    setError(null);

    const fetchData = city
      ? fetchWeatherByCity(city)
      : lat && lon
        ? fetchWeatherByCoords(parseFloat(lat), parseFloat(lon))
        : Promise.reject(new Error("No city or coordinates provided"));

    fetchData
      .then(setWeather)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params]);

  const condition = weather?.weather[0]?.main || "Clear";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--background))" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Loader2 className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />
        </motion.div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "hsl(var(--background))" }}>
        <p className="text-lg" style={{ color: "hsl(var(--destructive))" }}>{error || "Something went wrong"}</p>
        <button onClick={() => navigate("/")} className="underline text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <WeatherBackground condition={condition} />

      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-20 p-2.5 rounded-full"
        style={{ background: "hsla(0, 0%, 0%, 0.06)", backdropFilter: "blur(10px)", color: "hsl(var(--foreground))" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 md:p-10"
        style={{
          background: "hsla(0, 0%, 100%, 0.55)",
          backdropFilter: "blur(24px)",
          border: "1px solid hsla(0, 0%, 0%, 0.08)",
          boxShadow: "0 25px 50px -12px hsla(0, 0%, 0%, 0.08)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-6">
          <motion.h1
            className="text-3xl md:text-4xl font-light tracking-wide"
            style={{ color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {weather.name}
          </motion.h1>
          <p className="text-sm tracking-[0.2em] uppercase mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
            {weather.sys.country}
          </p>
        </div>

        <motion.div className="text-center mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <span className="text-8xl md:text-9xl font-extralight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--foreground))" }}>
            {Math.round(weather.main.temp)}
          </span>
          <span className="text-3xl font-light align-top ml-1" style={{ color: "hsl(var(--muted-foreground))" }}>°</span>
          <p className="text-sm mt-2 capitalize tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>
            {weather.weather[0].description}
          </p>
        </motion.div>

        <motion.div className="flex justify-center gap-6 mb-8 text-sm" style={{ color: "hsl(var(--muted-foreground))" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Feels {Math.round(weather.main.feels_like)}°</span>
          </div>
          <span>·</span>
          <span>H: {Math.round(weather.main.temp_max)}°</span>
          <span>·</span>
          <span>L: {Math.round(weather.main.temp_min)}°</span>
        </motion.div>

        <div className="w-full h-px mb-6" style={{ background: "hsla(0, 0%, 0%, 0.08)" }} />

        <motion.div className="grid grid-cols-2 gap-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DetailItem icon={<Droplets className="w-4 h-4" />} label="Humidity" value={`${weather.main.humidity}%`} />
          <DetailItem icon={<Wind className="w-4 h-4" />} label="Wind" value={`${weather.wind.speed} m/s`} />
          <DetailItem icon={<Eye className="w-4 h-4" />} label="Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} />
          <DetailItem icon={<Sunrise className="w-4 h-4" />} label="Sunrise" value={formatTime(weather.sys.sunrise)} />
        </motion.div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-xl" style={{ background: "hsla(0, 0%, 0%, 0.04)" }}>
      <span style={{ color: "hsl(var(--muted-foreground))" }}>{icon}</span>
    </div>
    <div>
      <p className="text-xs tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>{value}</p>
    </div>
  </div>
);

const formatTime = (unix: number) => {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default Weather;
