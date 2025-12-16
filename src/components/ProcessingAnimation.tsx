import { motion } from "framer-motion";

export const ProcessingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20 gap-12"
    >
      {/* Elegant spinner */}
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#1dabd5]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle ring with gradient */}
        <motion.div
          className="absolute inset-3 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner circle */}
        <div className="absolute inset-6 rounded-full bg-card elegant-shadow flex items-center justify-center">
          <motion.div
            className="w-8 h-8 rounded-full bg-[#1dabd5]"
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#1dabd5]"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * 2 * Math.PI) / 3 + Math.PI / 2) * 50],
              y: [0, Math.sin((i * 2 * Math.PI) / 3 + Math.PI / 2) * 50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <motion.p
          className="text-2xl font-serif text-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Perfecting your image
        </motion.p>
        <p className="text-sm text-muted-foreground">This will only take a moment</p>
      </div>

      {/* Progress line */}
      <div className="w-48 h-0.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full bg-[#1dabd5]"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};
