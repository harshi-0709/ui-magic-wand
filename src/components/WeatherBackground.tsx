import { motion } from "framer-motion";

interface WeatherBackgroundProps {
  condition: string;
}

const Tree = ({ x, scale = 1, flip = false, delay = 0 }: { x: number; scale?: number; flip?: boolean; delay?: number }) => (
  <motion.g
    transform={`translate(${x}, 0) scale(${flip ? -scale : scale}, ${scale})`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
  >
    {/* Trunk */}
    <rect x="46" y="60" width="8" height="40" rx="3" fill="hsl(30 40% 45%)" opacity={0.7} />
    {/* Foliage layers */}
    <motion.ellipse
      cx="50" cy="45" rx="28" ry="22"
      fill="hsl(140 35% 55%)" opacity={0.5}
      animate={{ scaleX: [1, 1.03, 0.97, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.ellipse
      cx="45" cy="38" rx="22" ry="18"
      fill="hsl(145 40% 48%)" opacity={0.45}
      animate={{ scaleX: [1, 0.97, 1.03, 1] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.ellipse
      cx="55" cy="32" rx="18" ry="15"
      fill="hsl(135 35% 42%)" opacity={0.4}
      animate={{ scaleX: [1, 1.04, 0.96, 1] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.g>
);

const Person = ({ x, delay = 0, hasUmbrella = false }: { x: number; delay?: number; hasUmbrella?: boolean }) => (
  <motion.g
    transform={`translate(${x}, 0)`}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 0.5, x: 0 }}
    transition={{ delay, duration: 1 }}
  >
    {/* Head */}
    <circle cx="10" cy="58" r="4" fill="hsl(30 30% 40%)" opacity={0.6} />
    {/* Body */}
    <line x1="10" y1="62" x2="10" y2="78" stroke="hsl(30 30% 40%)" strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
    {/* Legs */}
    <motion.line
      x1="10" y1="78" x2="5" y2="92"
      stroke="hsl(30 30% 40%)" strokeWidth="2" strokeLinecap="round" opacity={0.5}
      animate={{ x2: [5, 7, 5] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
    <motion.line
      x1="10" y1="78" x2="15" y2="92"
      stroke="hsl(30 30% 40%)" strokeWidth="2" strokeLinecap="round" opacity={0.5}
      animate={{ x2: [15, 13, 15] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
    />
    {/* Arms */}
    <line x1="10" y1="66" x2="3" y2="73" stroke="hsl(30 30% 40%)" strokeWidth="2" strokeLinecap="round" opacity={0.5} />
    {hasUmbrella ? (
      <>
        <line x1="10" y1="66" x2="10" y2="48" stroke="hsl(30 30% 35%)" strokeWidth="1.5" opacity={0.5} />
        <path d="M 0 50 Q 10 38, 20 50" fill="hsl(220 50% 55%)" opacity={0.35} />
      </>
    ) : (
      <line x1="10" y1="66" x2="17" y2="73" stroke="hsl(30 30% 40%)" strokeWidth="2" strokeLinecap="round" opacity={0.5} />
    )}
  </motion.g>
);

const ArtisticSun = ({ size = 80, x = 50, y = 50 }: { size?: number; x?: number; y?: number }) => {
  const rays = Array.from({ length: 12 }, (_, i) => i);
  return (
    <motion.g transform={`translate(${x}, ${y})`}>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {rays.map((i) => {
          const angle = (i * 360) / rays.length;
          const len = i % 2 === 0 ? size * 0.55 : size * 0.4;
          const rad = (angle * Math.PI) / 180;
          const innerR = size * 0.28;
          return (
            <motion.line
              key={i}
              x1={Math.cos(rad) * innerR}
              y1={Math.sin(rad) * innerR}
              x2={Math.cos(rad) * len}
              y2={Math.sin(rad) * len}
              stroke="hsl(42 90% 58%)"
              strokeWidth={i % 2 === 0 ? 3 : 2}
              strokeLinecap="round"
              opacity={0.35}
              animate={{ opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          );
        })}
      </motion.g>
      {/* Face circle */}
      <circle r={size * 0.25} fill="hsl(45 95% 70%)" opacity={0.3} />
      <circle r={size * 0.22} fill="hsl(42 90% 65%)" opacity={0.25} />
      {/* Closed eyes */}
      <motion.path
        d={`M ${-size * 0.1} ${-size * 0.03} Q ${-size * 0.05} ${-size * 0.08}, ${0} ${-size * 0.03}`}
        fill="none" stroke="hsl(30 40% 35%)" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
        animate={{ pathLength: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.path
        d={`M ${size * 0.02} ${-size * 0.03} Q ${size * 0.07} ${-size * 0.08}, ${size * 0.12} ${-size * 0.03}`}
        fill="none" stroke="hsl(30 40% 35%)" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
        animate={{ pathLength: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
      />
      {/* Small smile */}
      <path
        d={`M ${-size * 0.05} ${size * 0.06} Q ${0} ${size * 0.1}, ${size * 0.05} ${size * 0.06}`}
        fill="none" stroke="hsl(10 50% 50%)" strokeWidth="1.2" strokeLinecap="round" opacity={0.35}
      />
    </motion.g>
  );
};

const WindLines = () => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.path
        key={i}
        d={`M ${-50 + i * 30} ${120 + i * 40} Q ${50 + i * 40} ${100 + i * 35}, ${200 + i * 50} ${130 + i * 38}`}
        fill="none"
        stroke="hsl(200 30% 70%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0}
        animate={{ opacity: [0, 0.3, 0], pathLength: [0, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
      />
    ))}
  </>
);

const RainDrops = () => (
  <>
    {Array.from({ length: 25 }, (_, i) => {
      const x = (i * 43) % 900;
      const delay = (i * 0.15) % 2;
      return (
        <motion.line
          key={i}
          x1={x} y1={-10} x2={x - 8} y2={20}
          stroke="hsl(215 50% 65%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0}
          animate={{ y: [0, 700], opacity: [0, 0.35, 0.35, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay, ease: "linear" }}
        />
      );
    })}
  </>
);

const SnowFlakes = () => (
  <>
    {Array.from({ length: 20 }, (_, i) => {
      const x = (i * 51) % 900;
      const size = 2 + (i % 3) * 1.5;
      return (
        <motion.circle
          key={i}
          cx={x} cy={0} r={size}
          fill="hsl(210 20% 75%)"
          opacity={0}
          animate={{ cy: [0, 700], cx: [x, x + 30, x - 20, x], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
        />
      );
    })}
  </>
);

const Clouds = () => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.g key={i}
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx={150 + i * 280} cy={60 + i * 30}
          rx={90} ry={30}
          fill="hsl(210 15% 80%)" opacity={0.25}
        />
        <ellipse
          cx={180 + i * 280} cy={50 + i * 30}
          rx={60} ry={25}
          fill="hsl(210 15% 85%)" opacity={0.2}
        />
      </motion.g>
    ))}
  </>
);

const Birds = () => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.path
        key={i}
        d={`M ${600 + i * 60} ${40 + i * 20} Q ${608 + i * 60} ${32 + i * 20}, ${616 + i * 60} ${40 + i * 20} Q ${624 + i * 60} ${32 + i * 20}, ${632 + i * 60} ${40 + i * 20}`}
        fill="none"
        stroke="hsl(30 20% 45%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.25}
        animate={{ x: [-20, 20, -20], y: [-5, 5, -5] }}
        transition={{ duration: 6 + i * 2, repeat: Infinity }}
      />
    ))}
  </>
);

const getGradientColors = (condition: string) => {
  const c = condition.toLowerCase();
  if (c.includes("clear")) return ["hsla(42, 70%, 85%, 0.3)", "hsla(38, 60%, 90%, 0.15)"];
  if (c.includes("cloud")) return ["hsla(210, 20%, 88%, 0.3)", "hsla(210, 15%, 92%, 0.15)"];
  if (c.includes("rain") || c.includes("drizzle")) return ["hsla(215, 35%, 82%, 0.35)", "hsla(210, 25%, 88%, 0.2)"];
  if (c.includes("snow")) return ["hsla(210, 20%, 92%, 0.3)", "hsla(220, 15%, 95%, 0.15)"];
  if (c.includes("thunder")) return ["hsla(240, 20%, 78%, 0.3)", "hsla(220, 20%, 85%, 0.15)"];
  if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return ["hsla(200, 10%, 88%, 0.4)", "hsla(200, 10%, 92%, 0.2)"];
  return ["hsla(42, 70%, 85%, 0.3)", "hsla(38, 60%, 90%, 0.15)"];
};

const WeatherBackground = ({ condition }: WeatherBackgroundProps) => {
  const c = condition.toLowerCase();
  const [color1, color2] = getGradientColors(condition);
  const isRainy = c.includes("rain") || c.includes("drizzle") || c.includes("thunder");
  const isSnowy = c.includes("snow");
  const isCloudy = c.includes("cloud");
  const isClear = c.includes("clear");
  const isMisty = c.includes("mist") || c.includes("fog") || c.includes("haze");

  return (
    <div className="fixed inset-0 overflow-hidden -z-10" style={{ background: "white" }}>
      {/* Gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${color1} 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, ${color2} 0%, transparent 50%)`,
        }}
      />

      {/* Secondary accent gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${color1} 0%, transparent 40%)`,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 920 674" preserveAspectRatio="xMidYMid slice">
        {/* Ground line */}
        <path
          d="M 0 620 Q 200 600, 400 615 Q 600 630, 920 610 L 920 674 L 0 674 Z"
          fill="hsl(120 20% 88%)"
          opacity={0.3}
        />
        <path
          d="M 0 640 Q 300 625, 500 635 Q 700 645, 920 630 L 920 674 L 0 674 Z"
          fill="hsl(120 20% 82%)"
          opacity={0.2}
        />

        {/* Trees */}
        <Tree x={30} scale={1.2} delay={0.2} />
        <Tree x={720} scale={1} flip delay={0.5} />
        <Tree x={800} scale={0.7} delay={0.8} />
        <Tree x={-20} scale={0.8} flip delay={0.4} />

        {/* People */}
        <Person x={180} delay={0.6} hasUmbrella={isRainy} />
        <Person x={650} delay={1} hasUmbrella={isRainy} />

        {/* Birds */}
        {(isClear || isCloudy) && <Birds />}

        {/* Sun */}
        {(isClear || isCloudy) && <ArtisticSun size={90} x={760} y={90} />}

        {/* Weather-specific elements */}
        {isRainy && <RainDrops />}
        {isSnowy && <SnowFlakes />}
        {(isCloudy || isRainy || c.includes("thunder")) && <Clouds />}
        <WindLines />

        {/* Mist layers */}
        {isMisty && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.rect
                key={i}
                x={0} y={200 + i * 120}
                width={920} height={60}
                fill="hsl(200 10% 85%)"
                opacity={0}
                rx={30}
                animate={{ opacity: [0.05, 0.15, 0.05], x: [-30, 30, -30] }}
                transition={{ duration: 12 + i * 4, repeat: Infinity }}
              />
            ))}
          </>
        )}

        {/* Thunder flash */}
        {c.includes("thunder") && (
          <motion.rect
            x={0} y={0} width={920} height={674}
            fill="hsl(45 100% 90%)"
            opacity={0}
            animate={{ opacity: [0, 0, 0.15, 0, 0.08, 0, 0, 0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 3 }}
          />
        )}
      </svg>
    </div>
  );
};

export default WeatherBackground;
