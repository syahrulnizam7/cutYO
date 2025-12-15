import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { ProcessingAnimation } from "@/components/ProcessingAnimation";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ResultActions } from "@/components/ResultActions";
import { toast } from "sonner";

type AppState = "idle" | "processing" | "complete";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [originalImage, setOriginalImage] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string>("");

  const handleFileSelect = useCallback(async (file: File) => {
    setState("processing");

    const originalUrl = URL.createObjectURL(file);
    setOriginalImage(originalUrl);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://cutyo-api.alangkun.fun/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to remove background");
      }

      const blob = await response.blob();
      const processedUrl = URL.createObjectURL(blob);
      setProcessedImage(processedUrl);
      setState("complete");
      toast.success("Background removed beautifully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      setState("idle");
      setOriginalImage("");
    }
  }, []);

  const handleReset = () => {
    setState("idle");
    setOriginalImage("");
    setProcessedImage("");
  };

  return (
    <div className="min-h-screen relative">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      </div>

      <Header />

      <main className="relative pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Remove backgrounds
                <br />
                <span className="text-[#2596be] font-typography italic tracking-wide relative">
                  effortlessly
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#2596be]/30" />
                </span>

              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Upload your image and let our AI do the rest. Clean, precise,
                and beautifully done.
              </motion.p>
            </motion.div>

            {/* Right Side - Demo Comparison Slider */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                  <ComparisonSlider
                    originalImage="/Gemini_Generated_Image_9qq04h9qq04h9qq0.png"
                    processedImage="/Gemini_Generated_Image_9qq04h9qq04h9qq0 (1).png"
                  />
                </div>
                <motion.p
                  className="text-center text-sm text-muted-foreground mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Drag the slider to see the magic
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Upload Section */}
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="upload-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <UploadZone
                  onFileSelect={handleFileSelect}
                  isProcessing={false}
                />
              </motion.div>
            )}

            {state === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto"
              >
                <ProcessingAnimation />
              </motion.div>
            )}

            {state === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10 max-w-4xl mx-auto"
              >
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
                    Beautifully done
                  </h2>
                  <p className="text-muted-foreground">
                    Drag the slider to compare
                  </p>
                </motion.div>

                <ComparisonSlider
                  originalImage={originalImage}
                  processedImage={processedImage}
                />

                <ResultActions
                  processedImage={processedImage}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Your images are processed securely and never stored
        </p>
      </footer>
    </div>
  );
};

export default Index;
