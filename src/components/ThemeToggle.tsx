import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDark(!isDark)}
      className="relative w-12 h-12 rounded-full bg-card elegant-border elegant-shadow flex items-center justify-center transition-colors duration-300 hover:border-primary/50"
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-[#1dabd5]" />
        ) : (
          <Sun className="w-5 h-5 text-[#1dabd5]" />
        )}
      </motion.div>
    </motion.button>
  );
};
