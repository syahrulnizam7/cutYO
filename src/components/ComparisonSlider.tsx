import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

interface ComparisonSliderProps {
  originalImage: string;
  processedImage: string;
}

export const ComparisonSlider = ({
  originalImage,
  processedImage,
}: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      ref={containerRef}
      className="relative w-full aspect-[4/5] overflow-hidden elegant-border elegant-shadow-lg bg-card cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Checkered background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
            linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
            linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
          `,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
        }}
      />

      {/* Processed image */}
      <img
        src={processedImage}
        alt="Processed"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Original image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            width: `${100 / (sliderPosition / 100)}%`,
            maxWidth: "none",
          }}
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-[#1dabd5]/80"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-card elegant-border elegant-shadow flex items-center justify-center z-10"
        style={{
          left: `${sliderPosition}%`,
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MoveHorizontal className="w-5 h-5 text-[#1dabd5]" />
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm elegant-border text-xs font-medium text-muted-foreground">
        Original
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#1dabd5] text-xs font-medium text-white">
        Result
      </div>
    </motion.div>
  );
};
