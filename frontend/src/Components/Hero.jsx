import "../index.css"; // ✅ case-safe (must be index.css)
import "boxicons/css/boxicons.min.css";

import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

// ✅ explicit extensions + exact casing
import { AuroraTextEffect } from "./lightswind/AuroraTextEffect.jsx";
import { ShinyText } from "./lightswind/ShinyText.jsx";
import { GradientButton } from "./lightswind/GradientButton.jsx";
import { TypingText } from "./lightswind/TypingText.jsx";
import { Typewriter } from "./lib/Typewriter.jsx";

/* ------------------ Animations ------------------ */

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

/* ------------------ Component ------------------ */

const Hero = () => {
  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="flex items-start min-h-[90vh] px-4 overflow-hidden relative"
    >
      {/* Left Content */}
      <motion.div className="ml-6 lg:ml-25 z-10" variants={container}>
        <div className="w-full max-w-xl flex flex-col mt-40">
          <motion.h3
            className="text-base mt-12 mb-[-8%]"
            variants={fadeUp}
          >
            Hi, I am
          </motion.h3>

          <motion.div variants={fadeUp}>
            <Typewriter
              className="text-5xl md:text-8xl lg:text-[200px] mb-4 font-bold leading-tight"
              text="Harsh"
            />
          </motion.div>

          <TypingText
            delay={0.5}
            duration={3}
            fontSize="text-base"
            fontWeight="font-extrabold"
            align="left"
            className="opacity-75 mt-[-20px]"
          >
            I love building real-world products — from scalable backends to
            interactive frontends. Currently focused on Full-Stack development
            and creating experiences people actually enjoy using.
          </TypingText>

          <motion.div whileTap={{ scale: 0.96 }}>
            <GradientButton
              className="py-3 px-8 w-52 mt-8 font-medium transition-all duration-300 cursor-pointer"
              glowSize={10}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Hire me
            </GradientButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Spline Model */}
      <motion.div
        variants={fadeUp}
        className="absolute top-[-20%] lg:top-0 bottom-0 lg:right-[-25%] pointer-events-none hidden lg:block"
      >
        <Spline scene="https://prod.spline.design/QcRrocpymYc9yGE2/scene.splinecode" />
      </motion.div>
    </motion.main>
  );
};

export default Hero;
