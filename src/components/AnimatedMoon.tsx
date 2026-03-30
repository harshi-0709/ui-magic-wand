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
          background: "radial-gradient(circle, hsla(220, 40%, 85%, 0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moon body */}
      <div
        className="relative z-10 w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 35%, hsl(220 25% 90%), hsl(225 20% 82%), hsl(230 18% 75%))",
          boxShadow: "0 0 60px 20px hsla(220, 30%, 80%, 0.25), 0 0 120px 60px hsla(220, 30%, 80%, 0.1)",
        }}
      >
        {/* Craters */}
        <div
          className="absolute rounded-full"
          style={{ width: 18, height: 18, top: "22%", left: "25%", background: "hsl(225 15% 72%)", opacity: 0.3 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 12, height: 12, top: "60%", left: "65%", background: "hsl(225 15% 72%)", opacity: 0.25 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 8, height: 8, top: "35%", left: "70%", background: "hsl(225 15% 72%)", opacity: 0.2 }}
        />

        {/* Face */}
        <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-36 md:h-36 relative z-10">
          {/* Left eye - open */}
          <ellipse cx="42" cy="48" rx="7" ry="8" fill="hsl(230 20% 25%)" opacity={0.7} />
          <ellipse cx="43" cy="46" rx="3" ry="3.5" fill="hsl(220 30% 90%)" opacity={0.9} />
          <motion.ellipse
            cx="44" cy="45" rx="1.5" ry="1.5"
            fill="white" opacity={0.8}
            animate={{ cy: [44, 45, 44] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Right eye - open */}
          <ellipse cx="78" cy="48" rx="7" ry="8" fill="hsl(230 20% 25%)" opacity={0.7} />
          <ellipse cx="79" cy="46" rx="3" ry="3.5" fill="hsl(220 30% 90%)" opacity={0.9} />
          <motion.ellipse
            cx="80" cy="45" rx="1.5" ry="1.5"
            fill="white" opacity={0.8}
            animate={{ cy: [44, 45, 44] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />

          {/* Eyebrows */}
          <motion.path
            d="M 33 38 Q 42 32, 51 37"
            fill="none" stroke="hsl(230 15% 40%)" strokeWidth="1.8" strokeLinecap="round" opacity={0.5}
            animate={{ d: ["M 33 38 Q 42 32, 51 37", "M 33 36 Q 42 30, 51 35", "M 33 38 Q 42 32, 51 37"] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.path
            d="M 69 37 Q 78 32, 87 38"
            fill="none" stroke="hsl(230 15% 40%)" strokeWidth="1.8" strokeLinecap="round" opacity={0.5}
            animate={{ d: ["M 69 37 Q 78 32, 87 38", "M 69 35 Q 78 30, 87 36", "M 69 37 Q 78 32, 87 38"] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
          />

          {/* Rosy cheeks */}
          <ellipse cx="30" cy="65" rx="8" ry="5" fill="hsl(340 40% 75%)" opacity={0.2} />
          <ellipse cx="90" cy="65" rx="8" ry="5" fill="hsl(340 40% 75%)" opacity={0.2} />

          {/* Nose */}
          <path d="M 58 58 Q 60 64, 56 67" fill="none" stroke="hsl(230 15% 50%)" strokeWidth="1.2" strokeLinecap="round" opacity={0.35} />

          {/* Gentle smile */}
          <motion.path
            d="M 45 78 Q 60 88, 75 78"
            fill="none" stroke="hsl(230 15% 40%)" strokeWidth="2" strokeLinecap="round" opacity={0.5}
            animate={{ d: ["M 45 78 Q 60 88, 75 78", "M 45 78 Q 60 90, 75 78", "M 45 78 Q 60 88, 75 78"] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedMoon;
