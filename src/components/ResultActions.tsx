import { motion } from "framer-motion";
import { Download, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ResultActionsProps {
  processedImage: string;
  onReset: () => void;
}

export const ResultActions = ({ processedImage, onReset }: ResultActionsProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(processedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `eraser-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Image saved successfully");
    } catch {
      toast.error("Download failed");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const response = await fetch(processedImage);
        const blob = await response.blob();
        const file = new File([blob], "eraser-result.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "Background Removed",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied");
      }
    } catch {
      toast.error("Share failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownload}
        className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-medium text-primary-foreground bg-[#1dabd5] gold-glow transition-all duration-300"
      >
        <Download className="w-4 h-4" />
        Download
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleShare}
        className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-medium bg-card elegant-border text-foreground hover:border-primary/50 transition-all duration-300"
      >
        <Share2 className="w-4 h-4" />
        Share
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, rotate: -180 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        transition={{ duration: 0.4 }}
        className="w-14 h-14 rounded-full bg-card elegant-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
        aria-label="Start over"
      >
        <RotateCcw className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};
