import { motion } from "framer-motion";

const AnimatedSun = () => {
  const rays = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      {/* Rotating rays container */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {rays.map((i) => {
          const angle = (i * 360) / rays.length;
          const isWavy = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                width: isWavy ? "6px" : "4px",
                height: isWavy ? "110px" : "85px",
              }}
            >
              <motion.div
                className="w-full h-full rounded-full"
                style={{
                  background: `linear-gradient(to top, hsl(42 90% 58%), hsl(45 95% 70%))`,
                }}
                animate={isWavy ? { 
                  scaleY: [1, 1.1, 0.95, 1],
                  skewX: [0, 3, -3, 0]
                } : {
                  scaleY: [1, 0.9, 1.05, 1],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Sun face circle */}
      <div className="relative z-10 w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 40% 35%, hsl(45 95% 70%), hsl(42 90% 58%), hsl(28 85% 52%))`,
          boxShadow: `0 0 60px 20px hsla(42, 90%, 58%, 0.3), 0 0 120px 60px hsla(42, 90%, 58%, 0.1)`,
        }}
      >
        {/* Face */}
        <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-36 md:h-36">
          {/* Spiral cheeks */}
          <motion.path
            d="M 30 72 C 30 68, 34 66, 36 68 C 38 70, 36 74, 32 74 C 28 74, 26 70, 28 66 C 30 62, 36 60, 40 64"
            fill="none"
            stroke="hsl(28 60% 45%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.6}
          />
          <motion.path
            d="M 82 72 C 82 68, 86 66, 88 68 C 90 70, 88 74, 84 74 C 80 74, 78 70, 80 66 C 82 62, 88 60, 92 64"
            fill="none"
            stroke="hsl(28 60% 45%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.6}
          />

          {/* Left closed eye */}
          <motion.path
            d="M 32 50 Q 42 42, 52 50"
            fill="none"
            stroke="hsl(30 30% 25%)"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ pathLength: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* Left eyelashes */}
          <line x1="34" y1="47" x2="31" y2="42" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="44" x2="36" y2="39" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="42" x2="42" y2="37" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="46" y1="43" x2="48" y2="38" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="46" x2="53" y2="42" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right closed eye */}
          <motion.path
            d="M 68 50 Q 78 42, 88 50"
            fill="none"
            stroke="hsl(30 30% 25%)"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ pathLength: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
          {/* Right eyelashes */}
          <line x1="70" y1="46" x2="67" y2="42" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="74" y1="43" x2="72" y2="38" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="42" x2="78" y2="37" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="82" y1="44" x2="84" y2="39" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="86" y1="47" x2="89" y2="42" stroke="hsl(30 30% 25%)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Nose */}
          <path
            d="M 58 56 Q 60 62, 56 65"
            fill="none"
            stroke="hsl(28 50% 40%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.5}
          />

          {/* Lips */}
          <motion.path
            d="M 48 76 Q 54 72, 60 76 Q 66 72, 72 76"
            fill="none"
            stroke="hsl(10 60% 50%)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 52 76 Q 60 82, 68 76"
            fill="hsl(10 50% 55%)"
            opacity={0.4}
          />
        </svg>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(42, 90%, 58%, 0.15) 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedSun;
