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
          className="flex items-center"
        >
          <div className="w-14 h-14  flex items-center justify-center">
            <img src="/logo-cutyo.png" />
          </div>
          <div className="hidden sm:block">
            <span className="text-3xl font-brandCut text-foreground tracking-wide">
              Cut<span className="font-brandYo text-[#2596be] ml-0.5 transition-colors duration-300 hover:text-cyan-400">YO</span>
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
