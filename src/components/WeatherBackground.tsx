import { motion } from "framer-motion";

interface WeatherBackgroundProps {
  condition: string; // "clear", "clouds", "rain", "snow", "thunderstorm", "mist"
}

const Raindrop = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-0.5 h-6 rounded-full opacity-30"
    style={{ left: `${x}%`, background: "hsl(210 60% 70%)" }}
    initial={{ top: "-5%", opacity: 0 }}
    animate={{ top: "105%", opacity: [0, 0.4, 0.4, 0] }}
    transition={{ duration: 1.2, repeat: Infinity, delay, ease: "linear" }}
  />
);

const Snowflake = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full opacity-40"
    style={{ left: `${x}%`, width: size, height: size, background: "white" }}
    initial={{ top: "-5%", opacity: 0 }}
    animate={{ top: "105%", opacity: [0, 0.6, 0.6, 0], x: [0, 20, -20, 0] }}
    transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: "linear" }}
  />
);

const Cloud = ({ x, y, scale, delay }: { x: number; y: number; scale: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: 200 * scale,
      height: 80 * scale,
      background: "hsla(0, 0%, 85%, 0.4)",
      filter: "blur(30px)",
    }}
    animate={{ x: [0, 50, 0] }}
    transition={{ duration: 20 + delay * 5, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Lightning = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "hsla(45, 100%, 90%, 0.1)" }}
    animate={{ opacity: [0, 0, 1, 0, 0.5, 0, 0, 0, 0, 0] }}
    transition={{ duration: 5, repeat: Infinity, delay }}
  />
);

const WeatherBackground = ({ condition }: WeatherBackgroundProps) => {
  const c = condition.toLowerCase();

  const getBg = () => {
    if (c.includes("clear")) return "linear-gradient(180deg, hsl(200 70% 60%) 0%, hsl(38 80% 65%) 100%)";
    if (c.includes("cloud")) return "linear-gradient(180deg, hsl(210 20% 65%) 0%, hsl(210 15% 80%) 100%)";
    if (c.includes("rain") || c.includes("drizzle")) return "linear-gradient(180deg, hsl(215 25% 35%) 0%, hsl(210 20% 50%) 100%)";
    if (c.includes("snow")) return "linear-gradient(180deg, hsl(210 15% 75%) 0%, hsl(210 20% 90%) 100%)";
    if (c.includes("thunder")) return "linear-gradient(180deg, hsl(220 30% 20%) 0%, hsl(215 25% 35%) 100%)";
    if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "linear-gradient(180deg, hsl(210 10% 70%) 0%, hsl(210 15% 85%) 100%)";
    return "linear-gradient(180deg, hsl(200 70% 60%) 0%, hsl(38 80% 65%) 100%)";
  };

  const drops = Array.from({ length: 40 }, (_, i) => i);
  const flakes = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10" style={{ background: getBg() }}>
      {(c.includes("cloud") || c.includes("rain") || c.includes("thunder")) && (
        <>
          <Cloud x={10} y={5} scale={1.5} delay={0} />
          <Cloud x={50} y={10} scale={1.2} delay={2} />
          <Cloud x={75} y={3} scale={1} delay={4} />
          <Cloud x={30} y={15} scale={0.8} delay={1} />
        </>
      )}

      {(c.includes("rain") || c.includes("drizzle")) &&
        drops.map((i) => <Raindrop key={i} delay={i * 0.08} x={Math.random() * 100} />)
      }

      {c.includes("snow") &&
        flakes.map((i) => <Snowflake key={i} delay={i * 0.3} x={Math.random() * 100} size={3 + Math.random() * 5} />)
      }

      {c.includes("thunder") && (
        <>
          <Lightning delay={2} />
          <Lightning delay={7} />
        </>
      )}

      {c.includes("clear") && (
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(45 95% 70%), hsl(42 90% 58%))",
            boxShadow: "0 0 80px 40px hsla(42, 90%, 58%, 0.3)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      {(c.includes("mist") || c.includes("fog") || c.includes("haze")) && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-full h-32"
              style={{
                top: `${20 + i * 25}%`,
                background: "hsla(0, 0%, 100%, 0.15)",
                filter: "blur(40px)",
              }}
              animate={{ x: [-100, 100, -100], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 15 + i * 5, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default WeatherBackground;
