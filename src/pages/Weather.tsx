import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Wind, Eye, Thermometer, Sunrise, Loader2 } from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";
import AnimatedMoon from "@/components/AnimatedMoon";
import { fetchWeatherByCity, fetchWeatherByCoords, isNightTime, type WeatherData } from "@/lib/weather";

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
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(225 35% 18%), hsl(230 40% 10%))" }}
      >
        {/* Back button */}
        <motion.button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-20 p-2.5 rounded-full"
          style={{ background: "hsla(220, 30%, 80%, 0.1)", backdropFilter: "blur(10px)", color: "hsl(220 20% 80%)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedMoon />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-light tracking-wide mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(220 20% 80%)" }}
          >
            City not found
          </h2>
          <p className="text-sm tracking-wide mb-6" style={{ color: "hsl(220 20% 60%)" }}>
            The moon couldn't find that place either...
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-full text-sm tracking-wide transition-all hover:shadow-lg"
            style={{
              background: "hsla(220, 30%, 80%, 0.15)",
              border: "1px solid hsla(220, 30%, 80%, 0.2)",
              color: "hsl(220 20% 80%)",
              backdropFilter: "blur(10px)",
            }}
          >
            Try another city
          </button>
        </motion.div>
      </div>
    );
  }

  const condition = weather.weather[0]?.main || "Clear";
  const night = isNightTime(weather);

  const cardBg = night ? "hsla(225, 25%, 15%, 0.6)" : "hsla(0, 0%, 100%, 0.55)";
  const cardBorder = night ? "hsla(220, 30%, 50%, 0.15)" : "hsla(0, 0%, 0%, 0.08)";
  const cardShadow = night ? "0 25px 50px -12px hsla(225, 40%, 5%, 0.4)" : "0 25px 50px -12px hsla(0, 0%, 0%, 0.08)";
  const textColor = night ? "hsl(220 20% 90%)" : "hsl(var(--foreground))";
  const mutedColor = night ? "hsl(220 20% 65%)" : "hsl(var(--muted-foreground))";
  const detailBg = night ? "hsla(220, 30%, 50%, 0.1)" : "hsla(0, 0%, 0%, 0.04)";
  const dividerColor = night ? "hsla(220, 30%, 50%, 0.15)" : "hsla(0, 0%, 0%, 0.08)";
  const backBtnBg = night ? "hsla(220, 30%, 50%, 0.15)" : "hsla(0, 0%, 0%, 0.06)";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <WeatherBackground condition={condition} isNight={night} />

      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-20 p-2.5 rounded-full"
        style={{ background: backBtnBg, backdropFilter: "blur(10px)", color: textColor }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 md:p-10"
        style={{ background: cardBg, backdropFilter: "blur(24px)", border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-6">
          <motion.h1
            className="text-3xl md:text-4xl font-light tracking-wide"
            style={{ color: textColor, fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            {weather.name}
          </motion.h1>
          <p className="text-sm tracking-[0.2em] uppercase mt-1" style={{ color: mutedColor }}>
            {weather.sys.country}
          </p>
        </div>

        <motion.div className="text-center mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <span className="text-8xl md:text-9xl font-extralight" style={{ fontFamily: "'Cormorant Garamond', serif", color: textColor }}>
            {Math.round(weather.main.temp)}
          </span>
          <span className="text-3xl font-light align-top ml-1" style={{ color: mutedColor }}>°</span>
          <p className="text-sm mt-2 capitalize tracking-wide" style={{ color: mutedColor }}>
            {weather.weather[0].description}
          </p>
        </motion.div>

        <motion.div className="flex justify-center gap-6 mb-8 text-sm" style={{ color: mutedColor }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Feels {Math.round(weather.main.feels_like)}°</span>
          </div>
          <span>·</span>
          <span>H: {Math.round(weather.main.temp_max)}°</span>
          <span>·</span>
          <span>L: {Math.round(weather.main.temp_min)}°</span>
        </motion.div>

        <div className="w-full h-px mb-6" style={{ background: dividerColor }} />

        <motion.div className="grid grid-cols-2 gap-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DetailItem icon={<Droplets className="w-4 h-4" />} label="Humidity" value={`${weather.main.humidity}%`} textColor={textColor} mutedColor={mutedColor} detailBg={detailBg} />
          <DetailItem icon={<Wind className="w-4 h-4" />} label="Wind" value={`${weather.wind.speed} m/s`} textColor={textColor} mutedColor={mutedColor} detailBg={detailBg} />
          <DetailItem icon={<Eye className="w-4 h-4" />} label="Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} textColor={textColor} mutedColor={mutedColor} detailBg={detailBg} />
          <DetailItem icon={<Sunrise className="w-4 h-4" />} label="Sunrise" value={formatTime(weather.sys.sunrise)} textColor={textColor} mutedColor={mutedColor} detailBg={detailBg} />
        </motion.div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, textColor, mutedColor, detailBg }: {
  icon: React.ReactNode; label: string; value: string; textColor: string; mutedColor: string; detailBg: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-xl" style={{ background: detailBg }}>
      <span style={{ color: mutedColor }}>{icon}</span>
    </div>
    <div>
      <p className="text-xs tracking-wide" style={{ color: mutedColor }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: textColor }}>{value}</p>
    </div>
  </div>
);

const formatTime = (unix: number) => {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default Weather;
