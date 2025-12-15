import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const UploadZone = ({ onFileSelect, isProcessing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <label
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center w-full min-h-[300px] md:min-h-[340px]
          rounded-2xl cursor-pointer transition-all duration-500
          bg-card elegant-border elegant-shadow-lg
          ${isDragging ? "border-primary gold-glow scale-[1.02]" : "hover:border-primary/30 hover:elegant-shadow-lg"}
          ${isProcessing ? "pointer-events-none opacity-50" : ""}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isProcessing}
        />

        <AnimatePresence mode="wait">
          {isDragging ? (
            <motion.div
              key="dragging"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gold flex items-center justify-center gold-glow"
              >
                <Upload className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <p className="text-lg font-serif text-primary">Release to upload</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 p-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2596be]/20 to-[#2596be]/5 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1dabd5] flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <div className="text-center space-y-2">
                <p className="text-2xl font-serif text-foreground">
                  Drop your image here
                </p>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-[#2596be] font-medium cursor-pointer hover:underline">browse files</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Image className="w-3.5 h-3.5" />
                <span>Supports PNG, JPG, WEBP</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </label>
    </motion.div>
  );
};
