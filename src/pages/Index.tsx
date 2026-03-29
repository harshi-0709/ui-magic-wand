import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import AnimatedSun from "@/components/AnimatedSun";

const Index = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          navigate(`/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
        },
        () => {
          alert("Unable to get your location. Please search by city name.");
        }
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative"
      style={{
        background: `radial-gradient(ellipse at 50% 80%, hsl(40 30% 96%), hsl(35 40% 92%), hsl(30 20% 88%))`,
      }}
    >
      {/* Subtle ambient particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "hsl(var(--primary))",
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-light tracking-wider mb-2 z-10"
        style={{ color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif" }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        mausam
        <span className="text-2xl md:text-3xl font-normal" style={{ color: "hsl(var(--primary))" }}>
          .io
        </span>
      </motion.h1>

      <motion.p
        className="text-sm tracking-[0.3em] uppercase mb-10 z-10"
        style={{ color: "hsl(var(--muted-foreground))" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        feel the sky
      </motion.p>

      {/* Sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        className="z-10"
      >
        <AnimatedSun />
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="mt-12 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!showSearch ? (
            <motion.div
              key="buttons"
              className="flex flex-col sm:flex-row gap-3"
              exit={{ opacity: 0, y: -10 }}
            >
              <button
                onClick={() => setShowSearch(true)}
                className="group flex items-center gap-3 px-8 py-3.5 rounded-full border transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: "hsl(var(--border))",
                  background: "hsla(0, 0%, 100%, 0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Search className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: "hsl(var(--primary))" }} />
                <span className="text-sm tracking-wide" style={{ color: "hsl(var(--foreground))" }}>
                  Search a City
                </span>
              </button>

              <button
                onClick={handleCurrentLocation}
                className="group flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-sm tracking-wide">Current Location</span>
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="search"
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-full"
                style={{
                  background: "hsla(0, 0%, 100%, 0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent outline-none text-sm w-48 md:w-64 placeholder:tracking-wide"
                  style={{ color: "hsl(var(--foreground))" }}
                />
              </div>
              <button
                type="submit"
                className="p-3 rounded-full transition-all hover:shadow-lg"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => { setShowSearch(false); setCity(""); }}
                className="text-xs tracking-wide underline underline-offset-4"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                cancel
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
