import { motion } from "framer-motion";

const AnimatedMoon = () => {
  const stars = Array.from({ length: 12 }, (_, i) => ({
    x: 30 + (i * 67) % 280,
    y: 20 + (i * 43) % 200,
    size: 1.5 + (i % 3),
    delay: i * 0.3,
  }));

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: star.x,
            top: star.y,
            background: "hsl(220 30% 70%)",
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: star.delay }}
        />
      ))}

      {/* Moon glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, hsla(38, 80%, 55%, 0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Crescent Moon with face - classic style */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-44 h-44 md:w-56 md:h-56 relative z-10"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <clipPath id="crescentClip">
            {/* Main circle minus inner circle to create crescent */}
            <path d="M 100,10 A 90,90 0 1,1 100,190 A 90,90 0 1,1 100,10 Z" />
          </clipPath>
          <mask id="crescentMask">
            <rect width="200" height="200" fill="white" />
            {/* Cut out the inner circle to form the crescent */}
            <circle cx="130" cy="85" r="72" fill="black" />
          </mask>
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(38, 75%, 60%)" />
            <stop offset="50%" stopColor="hsl(35, 80%, 55%)" />
            <stop offset="100%" stopColor="hsl(30, 70%, 48%)" />
          </linearGradient>
        </defs>

        {/* Crescent body */}
        <circle cx="100" cy="100" r="90" fill="url(#moonGrad)" mask="url(#crescentMask)" />

        {/* Outline for the crescent */}
        <circle
          cx="100" cy="100" r="90"
          fill="none" stroke="hsl(25, 60%, 35%)" strokeWidth="2"
          mask="url(#crescentMask)"
        />

        {/* Face elements - positioned on the crescent's visible area */}
        {/* Eye - closed, with lashes */}
        <motion.path
          d="M 62 80 Q 68 76, 74 80"
          fill="none" stroke="hsl(25, 50%, 30%)" strokeWidth="2" strokeLinecap="round"
          animate={{ d: ["M 62 80 Q 68 76, 74 80", "M 62 79 Q 68 74, 74 79", "M 62 80 Q 68 76, 74 80"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Eyelashes */}
        <line x1="63" y1="79" x2="60" y2="75" stroke="hsl(25, 50%, 30%)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="66" y1="77" x2="64" y2="73" stroke="hsl(25, 50%, 30%)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="70" y1="77" x2="69" y2="73" stroke="hsl(25, 50%, 30%)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="73" y1="79" x2="75" y2="75" stroke="hsl(25, 50%, 30%)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Eyebrow */}
        <path
          d="M 58 72 Q 67 66, 76 72"
          fill="none" stroke="hsl(25, 50%, 30%)" strokeWidth="1.5" strokeLinecap="round"
        />

        {/* Nose */}
        <path
          d="M 72 90 Q 78 96, 74 102 Q 70 104, 68 102"
          fill="none" stroke="hsl(25, 50%, 30%)" strokeWidth="1.8" strokeLinecap="round"
        />

        {/* Lips */}
        <motion.path
          d="M 60 112 Q 65 108, 70 112 Q 67 116, 60 112"
          fill="hsl(0, 35%, 55%)" stroke="hsl(25, 50%, 30%)" strokeWidth="1" opacity={0.6}
          animate={{ d: ["M 60 112 Q 65 108, 70 112 Q 67 116, 60 112", "M 60 112 Q 65 107, 70 112 Q 67 117, 60 112", "M 60 112 Q 65 108, 70 112 Q 67 116, 60 112"] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Beauty mark / freckles */}
        <circle cx="56" cy="105" r="1.5" fill="hsl(25, 50%, 30%)" opacity={0.4} />
        <circle cx="76" cy="88" r="1" fill="hsl(25, 50%, 30%)" opacity={0.3} />

        {/* Chin dimple */}
        <path
          d="M 55 125 Q 58 128, 61 125"
          fill="none" stroke="hsl(25, 50%, 30%)" strokeWidth="1" strokeLinecap="round" opacity={0.3}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedMoon;
