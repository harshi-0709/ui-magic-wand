import { motion } from "framer-motion";

interface WeatherBackgroundProps {
  condition: string;
  isNight?: boolean;
}

const Tree = ({ x, scale = 1, flip = false, delay = 0, isNight = false }: { x: number; scale?: number; flip?: boolean; delay?: number; isNight?: boolean }) => (
  <motion.g
    transform={`translate(${x}, 0) scale(${flip ? -scale : scale}, ${scale})`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
  >
    <rect x="46" y="60" width="8" height="40" rx="3" fill={isNight ? "hsl(230 20% 30%)" : "hsl(30 40% 45%)"} opacity={0.7} />
    <motion.ellipse cx="50" cy="45" rx="28" ry="22" fill={isNight ? "hsl(220 25% 25%)" : "hsl(140 35% 55%)"} opacity={0.5}
      animate={{ scaleX: [1, 1.03, 0.97, 1] }} transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }} />
    <motion.ellipse cx="45" cy="38" rx="22" ry="18" fill={isNight ? "hsl(225 25% 22%)" : "hsl(145 40% 48%)"} opacity={0.45}
      animate={{ scaleX: [1, 0.97, 1.03, 1] }} transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut" }} />
    <motion.ellipse cx="55" cy="32" rx="18" ry="15" fill={isNight ? "hsl(230 25% 20%)" : "hsl(135 35% 42%)"} opacity={0.4}
      animate={{ scaleX: [1, 1.04, 0.96, 1] }} transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }} />
  </motion.g>
);

const Person = ({ x, delay = 0, hasUmbrella = false, isNight = false }: { x: number; delay?: number; hasUmbrella?: boolean; isNight?: boolean }) => {
  const color = isNight ? "hsl(220 20% 50%)" : "hsl(30 30% 40%)";
  return (
    <motion.g transform={`translate(${x}, 0)`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.5, x: 0 }} transition={{ delay, duration: 1 }}>
      <circle cx="10" cy="58" r="4" fill={color} opacity={0.6} />
      <line x1="10" y1="62" x2="10" y2="78" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
      <motion.line x1="10" y1="78" x2="5" y2="92" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5}
        animate={{ x2: [5, 7, 5] }} transition={{ duration: 1.2, repeat: Infinity }} />
      <motion.line x1="10" y1="78" x2="15" y2="92" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5}
        animate={{ x2: [15, 13, 15] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }} />
      <line x1="10" y1="66" x2="3" y2="73" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5} />
      {hasUmbrella ? (
        <>
          <line x1="10" y1="66" x2="10" y2="48" stroke={color} strokeWidth="1.5" opacity={0.5} />
          <path d="M 0 50 Q 10 38, 20 50" fill="hsl(220 50% 55%)" opacity={0.35} />
        </>
      ) : (
        <line x1="10" y1="66" x2="17" y2="73" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5} />
      )}
    </motion.g>
  );
};

const ArtisticSun = ({ size = 80, x = 50, y = 50 }: { size?: number; x?: number; y?: number }) => {
  const rays = Array.from({ length: 12 }, (_, i) => i);
  return (
    <motion.g transform={`translate(${x}, ${y})`}>
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        {rays.map((i) => {
          const angle = (i * 360) / rays.length;
          const len = i % 2 === 0 ? size * 0.55 : size * 0.4;
          const rad = (angle * Math.PI) / 180;
          const innerR = size * 0.28;
          return (
            <motion.line key={i} x1={Math.cos(rad) * innerR} y1={Math.sin(rad) * innerR}
              x2={Math.cos(rad) * len} y2={Math.sin(rad) * len}
              stroke="hsl(42 90% 58%)" strokeWidth={i % 2 === 0 ? 3 : 2} strokeLinecap="round" opacity={0.35}
              animate={{ opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} />
          );
        })}
      </motion.g>
      <circle r={size * 0.25} fill="hsl(45 95% 70%)" opacity={0.3} />
      <circle r={size * 0.22} fill="hsl(42 90% 65%)" opacity={0.25} />
      <motion.path d={`M ${-size * 0.1} ${-size * 0.03} Q ${-size * 0.05} ${-size * 0.08}, ${0} ${-size * 0.03}`}
        fill="none" stroke="hsl(30 40% 35%)" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
        animate={{ pathLength: [0.9, 1, 0.9] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.path d={`M ${size * 0.02} ${-size * 0.03} Q ${size * 0.07} ${-size * 0.08}, ${size * 0.12} ${-size * 0.03}`}
        fill="none" stroke="hsl(30 40% 35%)" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
        animate={{ pathLength: [0.9, 1, 0.9] }} transition={{ duration: 4, repeat: Infinity, delay: 0.3 }} />
      <path d={`M ${-size * 0.05} ${size * 0.06} Q ${0} ${size * 0.1}, ${size * 0.05} ${size * 0.06}`}
        fill="none" stroke="hsl(10 50% 50%)" strokeWidth="1.2" strokeLinecap="round" opacity={0.35} />
    </motion.g>
  );
};

const NightMoon = ({ x = 760, y = 90 }: { x?: number; y?: number }) => (
  <motion.g transform={`translate(${x}, ${y})`}>
    {/* Glow */}
    <motion.circle r={50} fill="hsla(38, 70%, 55%, 0.1)"
      animate={{ r: [50, 55, 50], opacity: [0.08, 0.15, 0.08] }}
      transition={{ duration: 5, repeat: Infinity }} />
    <defs>
      <mask id="nightCrescentMask">
        <rect x={-40} y={-40} width={80} height={80} fill="white" />
        <circle cx={12} cy={-8} r={22} fill="black" />
      </mask>
      <linearGradient id="nightMoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 75%, 60%)" />
        <stop offset="100%" stopColor="hsl(30, 70%, 48%)" />
      </linearGradient>
    </defs>
    {/* Crescent body */}
    <circle r={28} fill="url(#nightMoonGrad)" mask="url(#nightCrescentMask)" />
    <circle r={28} fill="none" stroke="hsl(25, 60%, 35%)" strokeWidth="0.8" mask="url(#nightCrescentMask)" />
    {/* Closed eye with lashes */}
    <motion.path d="M -12 -2 Q -8 -5, -4 -2" fill="none" stroke="hsl(25, 50%, 30%)" strokeWidth="1" strokeLinecap="round"
      animate={{ d: ["M -12 -2 Q -8 -5, -4 -2", "M -12 -3 Q -8 -6, -4 -3", "M -12 -2 Q -8 -5, -4 -2"] }}
      transition={{ duration: 4, repeat: Infinity }} />
    <line x1={-11} y1={-2} x2={-13} y2={-5} stroke="hsl(25, 50%, 30%)" strokeWidth="0.6" strokeLinecap="round" />
    <line x1={-8} y1={-4} x2={-9} y2={-7} stroke="hsl(25, 50%, 30%)" strokeWidth="0.6" strokeLinecap="round" />
    <line x1={-5} y1={-2} x2={-3} y2={-5} stroke="hsl(25, 50%, 30%)" strokeWidth="0.6" strokeLinecap="round" />
    {/* Nose */}
    <path d="M -2 2 Q 2 6, 0 9 Q -2 10, -3 9" fill="none" stroke="hsl(25, 50%, 30%)" strokeWidth="0.8" strokeLinecap="round" />
    {/* Lips */}
    <path d="M -8 12 Q -5 10, -2 12 Q -5 14, -8 12" fill="hsl(0, 35%, 55%)" stroke="hsl(25, 50%, 30%)" strokeWidth="0.5" opacity={0.5} />
  </motion.g>
);

const Stars = () => (
  <>
    {Array.from({ length: 15 }, (_, i) => (
      <motion.circle key={i}
        cx={(i * 67) % 900} cy={20 + (i * 43) % 250}
        r={1 + (i % 3)} fill="hsl(220 30% 80%)"
        animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }} />
    ))}
  </>
);

const WindLines = () => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.path key={i}
        d={`M ${-50 + i * 30} ${120 + i * 40} Q ${50 + i * 40} ${100 + i * 35}, ${200 + i * 50} ${130 + i * 38}`}
        fill="none" stroke="hsl(200 30% 70%)" strokeWidth="1.5" strokeLinecap="round" opacity={0}
        animate={{ opacity: [0, 0.3, 0], pathLength: [0, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }} />
    ))}
  </>
);

const RainDrops = () => (
  <>
    {Array.from({ length: 25 }, (_, i) => {
      const x = (i * 43) % 900;
      return (
        <motion.line key={i} x1={x} y1={-10} x2={x - 8} y2={20}
          stroke="hsl(215 50% 65%)" strokeWidth="1.5" strokeLinecap="round" opacity={0}
          animate={{ y: [0, 700], opacity: [0, 0.35, 0.35, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: (i * 0.15) % 2, ease: "linear" }} />
      );
    })}
  </>
);

const SnowFlakes = () => (
  <>
    {Array.from({ length: 20 }, (_, i) => {
      const x = (i * 51) % 900;
      return (
        <motion.circle key={i} cx={x} cy={0} r={2 + (i % 3) * 1.5}
          fill="hsl(210 20% 75%)" opacity={0}
          animate={{ cy: [0, 700], cx: [x, x + 30, x - 20, x], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 0.4, ease: "linear" }} />
      );
    })}
  </>
);

const Clouds = ({ isNight = false }: { isNight?: boolean }) => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.g key={i} animate={{ x: [0, 60, 0] }} transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx={150 + i * 280} cy={60 + i * 30} rx={90} ry={30}
          fill={isNight ? "hsl(225 15% 35%)" : "hsl(210 15% 80%)"} opacity={isNight ? 0.3 : 0.25} />
        <ellipse cx={180 + i * 280} cy={50 + i * 30} rx={60} ry={25}
          fill={isNight ? "hsl(225 15% 40%)" : "hsl(210 15% 85%)"} opacity={isNight ? 0.25 : 0.2} />
      </motion.g>
    ))}
  </>
);

const Birds = () => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.path key={i}
        d={`M ${600 + i * 60} ${40 + i * 20} Q ${608 + i * 60} ${32 + i * 20}, ${616 + i * 60} ${40 + i * 20} Q ${624 + i * 60} ${32 + i * 20}, ${632 + i * 60} ${40 + i * 20}`}
        fill="none" stroke="hsl(30 20% 45%)" strokeWidth="1.5" strokeLinecap="round" opacity={0.25}
        animate={{ x: [-20, 20, -20], y: [-5, 5, -5] }} transition={{ duration: 6 + i * 2, repeat: Infinity }} />
    ))}
  </>
);

const getGradientColors = (condition: string, isNight: boolean) => {
  if (isNight) {
    const c = condition.toLowerCase();
    if (c.includes("clear")) return ["hsla(225, 45%, 18%, 0.9)", "hsla(230, 40%, 12%, 0.8)"];
    if (c.includes("cloud")) return ["hsla(225, 35%, 22%, 0.9)", "hsla(230, 30%, 16%, 0.8)"];
    if (c.includes("rain") || c.includes("drizzle")) return ["hsla(220, 40%, 15%, 0.95)", "hsla(225, 35%, 10%, 0.85)"];
    if (c.includes("snow")) return ["hsla(225, 30%, 25%, 0.85)", "hsla(230, 25%, 18%, 0.75)"];
    if (c.includes("thunder")) return ["hsla(240, 35%, 12%, 0.95)", "hsla(235, 30%, 8%, 0.9)"];
    return ["hsla(225, 45%, 18%, 0.9)", "hsla(230, 40%, 12%, 0.8)"];
  }
  const c = condition.toLowerCase();
  if (c.includes("clear")) return ["hsla(42, 70%, 85%, 0.3)", "hsla(38, 60%, 90%, 0.15)"];
  if (c.includes("cloud")) return ["hsla(210, 20%, 88%, 0.3)", "hsla(210, 15%, 92%, 0.15)"];
  if (c.includes("rain") || c.includes("drizzle")) return ["hsla(215, 35%, 82%, 0.35)", "hsla(210, 25%, 88%, 0.2)"];
  if (c.includes("snow")) return ["hsla(210, 20%, 92%, 0.3)", "hsla(220, 15%, 95%, 0.15)"];
  if (c.includes("thunder")) return ["hsla(240, 20%, 78%, 0.3)", "hsla(220, 20%, 85%, 0.15)"];
  if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return ["hsla(200, 10%, 88%, 0.4)", "hsla(200, 10%, 92%, 0.2)"];
  return ["hsla(42, 70%, 85%, 0.3)", "hsla(38, 60%, 90%, 0.15)"];
};

const WeatherBackground = ({ condition, isNight = false }: WeatherBackgroundProps) => {
  const c = condition.toLowerCase();
  const [color1, color2] = getGradientColors(condition, isNight);
  const isRainy = c.includes("rain") || c.includes("drizzle") || c.includes("thunder");
  const isSnowy = c.includes("snow");
  const isCloudy = c.includes("cloud");
  const isClear = c.includes("clear");
  const isMisty = c.includes("mist") || c.includes("fog") || c.includes("haze");

  const bgColor = isNight ? "hsl(225 35% 10%)" : "white";
  const groundFill1 = isNight ? "hsl(225 20% 15%)" : "hsl(120 20% 88%)";
  const groundFill2 = isNight ? "hsl(225 20% 12%)" : "hsl(120 20% 82%)";

  return (
    <div className="fixed inset-0 overflow-hidden -z-10" style={{ background: bgColor }}>
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${color1} 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, ${color2} 0%, transparent 50%)` }} />
      <motion.div className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 70% 30%, ${color1} 0%, transparent 40%)` }}
        animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 920 674" preserveAspectRatio="xMidYMid slice">
        <path d="M 0 620 Q 200 600, 400 615 Q 600 630, 920 610 L 920 674 L 0 674 Z" fill={groundFill1} opacity={0.3} />
        <path d="M 0 640 Q 300 625, 500 635 Q 700 645, 920 630 L 920 674 L 0 674 Z" fill={groundFill2} opacity={0.2} />

        <Tree x={30} scale={1.2} delay={0.2} isNight={isNight} />
        <Tree x={720} scale={1} flip delay={0.5} isNight={isNight} />
        <Tree x={800} scale={0.7} delay={0.8} isNight={isNight} />
        <Tree x={-20} scale={0.8} flip delay={0.4} isNight={isNight} />

        <Person x={180} delay={0.6} hasUmbrella={isRainy} isNight={isNight} />
        <Person x={650} delay={1} hasUmbrella={isRainy} isNight={isNight} />

        {!isNight && (isClear || isCloudy) && <Birds />}
        {isNight && <Stars />}

        {isNight ? <NightMoon x={760} y={90} /> : (isClear || isCloudy) && <ArtisticSun size={90} x={760} y={90} />}

        {isRainy && <RainDrops />}
        {isSnowy && <SnowFlakes />}
        {(isCloudy || isRainy || c.includes("thunder")) && <Clouds isNight={isNight} />}
        <WindLines />

        {isMisty && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.rect key={i} x={0} y={200 + i * 120} width={920} height={60}
                fill={isNight ? "hsl(225 15% 25%)" : "hsl(200 10% 85%)"} opacity={0} rx={30}
                animate={{ opacity: [0.05, 0.15, 0.05], x: [-30, 30, -30] }}
                transition={{ duration: 12 + i * 4, repeat: Infinity }} />
            ))}
          </>
        )}

        {c.includes("thunder") && (
          <motion.rect x={0} y={0} width={920} height={674}
            fill={isNight ? "hsl(220 80% 80%)" : "hsl(45 100% 90%)"} opacity={0}
            animate={{ opacity: [0, 0, 0.15, 0, 0.08, 0, 0, 0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 3 }} />
        )}
      </svg>
    </div>
  );
};

export default WeatherBackground;
