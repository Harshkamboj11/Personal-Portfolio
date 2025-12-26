import { motion } from "framer-motion";

const Lamp = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Incoming Motion Light */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-0 w-[500px] h-[500px] bg-[#e99b63] rounded-full blur-3xl -mt-[20%] pointer-events-none"
      />

      {/* Glow Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "300px", opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="h-[3px] bg-black z-20 -mt-[48.5%]"
      />
    </div>
  );
};

export default Lamp;
