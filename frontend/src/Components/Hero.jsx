import '../index.css';
import 'boxicons/css/boxicons.min.css';
import { AuroraTextEffect } from './lightswind/aurora-text-effect';
import { ShinyText } from './lightswind/shiny-text';
import Spline from '@splinetool/react-spline';
import { Typewriter } from './lib/typewriter';
import { motion } from 'framer-motion';
import { GradientButton } from './lightswind/gradient-button';
import { TypingText } from './lightswind/TypingText';

// Animation variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const buttonAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const splineAnim = {
  hidden: { opacity: 0, scale: 0.96, x: 40 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

const Hero = () => {
  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="flex  items-start min-h-[90vh] px-4 overflow:hidden"
    >
      <motion.div className="ml-25" variants={container}>
        <div className="w-full max-w-xl z-10 flex flex-col ml-6 mt-40">
          <motion.h3
            className="text-base mb-[-8%] mt-12 text-left"
            variants={fadeUp}
          >
            Hi, I am
          </motion.h3>
          <motion.div variants={fadeUp}>
            <Typewriter
              className="text-5xl md:text-8xl lg:text-[200px] mb-4 font-bold text-left lg:ml-[-2.5%] leading-tight"
              text="Harsh"
            />
          </motion.div>
          {/* <motion.span
            className="text-base opacity-75 mt-2 text-justify"
            variants={fadeUp}
          >
            I love building real-world products — from scalable backends to
            interactive frontends. Currently focused on Full-Stack development
            and creating experiences people actually enjoy using. <br />
          </motion.span> */}
          <TypingText
            delay={0.5}
            duration={3}
            fontSize="text-m"
            fontWeight="font-extrabold"
            color="text-white-500"
            align="left"
            className="text-base opacity-75 mt-[-20px] text-justify"
          >
            I love building real-world products — from scalable backends to
            interactive frontends. Currently focused on Full-Stack development
            and creating experiences people actually enjoy using.
          </TypingText>

          {/* <motion.button
            className="text-base hidden lg:block border-[#e99b63] text-white hover:scale-97 py-3 lg:w-100 px-8 rounded-full border font-medium transition-all duration-300 z-50 w-52 mt-8 hover:bg-[#e99b63] hover:text-black border-3 cursor-pointer shadow-md/30 shadow-white"
            variants={buttonAnim}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            Hire me
          </motion.button> */}
          <motion.div whileTap={{ scale: 0.96 }}>
            <GradientButton
              className="hover:scale-97 py-3 z-50 lg:w-100 px-8 transition-all duration-300 z-50 w-52 mt-8 cursor-pointer font-medium"
              glowSize={10}
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Hire me
            </GradientButton>
          </motion.div>
        </div>
      </motion.div>

      <Spline
        className="absolute lg:top-0 top-[-20%] bottom-0 lg:right-[-25%] lg:mt-[-35px] lazy pointer-events-none hidden lg:block"
        scene="https://prod.spline.design/QcRrocpymYc9yGE2/scene.splinecode"
      />
    </motion.main>
  );
};

export default Hero;
