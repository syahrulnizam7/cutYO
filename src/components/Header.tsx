import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#1dabd5] flex items-center justify-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-serif text-foreground tracking-wide">
              Eraser<span className="text-[#2596be]">.</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
};
