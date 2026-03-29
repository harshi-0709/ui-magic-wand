import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Wind, Eye, Thermometer, Sunrise, Sunset } from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";

// Mock data — replace with your actual API call
const useMockWeather = (city: string | null) => {
  // This simulates what your backend returns. Wire up your actual API.
  return {
    name: city || "Delhi",
    sys: { country: "IN", sunrise: 1700000000, sunset: 1700040000 },
    main: { temp: 28, feels_like: 31, humidity: 65, temp_min: 24, temp_max: 32 },
    weather: [{ description: "clear sky", icon: "01d", main: "Clear" }],
    wind: { speed: 4.2 },
    visibility: 10000,
  };
};

const Weather = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const city = params.get("city");
  const weather = useMockWeather(city);

  const condition = weather.weather[0]?.main || "Clear";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <WeatherBackground condition={condition} />

      {/* Back button */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-20 p-2.5 rounded-full"
        style={{
          background: "hsla(0, 0%, 0%, 0.06)",
          backdropFilter: "blur(10px)",
          color: "hsl(var(--foreground))",
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Weather card */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 md:p-10"
        style={{
          background: "hsla(0, 0%, 100%, 0.12)",
          backdropFilter: "blur(24px)",
          border: "1px solid hsla(0, 0%, 100%, 0.2)",
          boxShadow: "0 25px 50px -12px hsla(0, 0%, 0%, 0.15)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* City & Country */}
        <div className="text-center mb-6">
          <motion.h1
            className="text-3xl md:text-4xl font-light tracking-wide"
             style={{ color: "hsl(var(--foreground))" }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
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

        {/* Temperature */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-8xl md:text-9xl font-extralight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--foreground))" }}>
            {Math.round(weather.main.temp)}
          </span>
          <span className="text-3xl font-light align-top ml-1" style={{ color: "hsl(var(--muted-foreground))" }}>°</span>
          <p className="text-sm mt-2 capitalize tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>
            {weather.weather[0].description}
          </p>
        </motion.div>

        {/* Feels like + Hi/Lo */}
        <motion.div
          className="flex justify-center gap-6 mb-8 text-sm"
          style={{ color: "hsla(0, 0%, 100%, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Feels {Math.round(weather.main.feels_like)}°</span>
          </div>
          <span>·</span>
          <span>H: {Math.round(weather.main.temp_max)}°</span>
          <span>·</span>
          <span>L: {Math.round(weather.main.temp_min)}°</span>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px mb-6" style={{ background: "hsla(0, 0%, 100%, 0.15)" }} />

        {/* Details grid */}
        <motion.div
          className="grid grid-cols-2 gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
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
    <div
      className="p-2 rounded-xl"
      style={{ background: "hsla(0, 0%, 100%, 0.1)" }}
    >
      <span style={{ color: "hsla(0, 0%, 100%, 0.7)" }}>{icon}</span>
    </div>
    <div>
      <p className="text-xs tracking-wide" style={{ color: "hsla(0, 0%, 100%, 0.5)" }}>{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
);

const formatTime = (unix: number) => {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default Weather;
