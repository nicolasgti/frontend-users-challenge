import { motion } from "framer-motion";

export function SplashScreen() {
  return (
    <motion.div
      className="bg-[#0a1f3d] flex items-center justify-center h-full w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src="/logo.png"
        alt="WenLock"
        className="w-38"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
    </motion.div>
  );
}
