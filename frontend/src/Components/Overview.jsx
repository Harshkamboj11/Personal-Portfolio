import React from 'react';
import { motion } from 'framer-motion';

// ✅ exact case + extension
import { InteractiveGradient } from './lightswind/interactive-gradient';

/* ------------------ Animations ------------------ */

const cardsFadeIn = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      delay: i * 0.18,
    },
  }),
};

const parentStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

/* ------------------ Component ------------------ */

const Overview = () => {
  const skills = [
    {
      heading: '🧠 Full-Stack Problem Solver',
      description:
        'Developing end-to-end applications using Node.js, Express, MongoDB, and MySQL, focusing on real-world logic and scalability.',
      tagline: '~Turning complex ideas into smooth user experiences.',
    },
    {
      heading: '⚡ Modern Frontend Developer',
      description:
        'Building clean, responsive, and interactive UIs using React and Tailwind CSS, with strong attention to UX and performance.',
      tagline: '~Powering applications with clean and efficient data flow.',
    },
    {
      heading: '🎨 Creative + Technical Thinker',
      description:
        'Blending development with creativity through video editing and basic 3D tools to enhance user experience and visual storytelling.',
      tagline:
        '~Merging tech & creativity to deliver impactful digital products.',
    },
    {
      heading: '🚀 Consistent Learner',
      description:
        'Always learning by building projects, exploring new tech, and improving code quality through hands-on experience.',
      tagline: '~Growth mindset + hands-on execution.',
    },
  ];

  return (
    <motion.section
      className="w-full flex flex-col px-6 lg:px-15 mt-30 mb-14"
      initial={{ opacity: 0, y: 40, filter: 'blur(1px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
    >
      {/* Text Section */}
      <div className="max-w-4xl mb-10">
        <motion.h3
          className="opacity-50"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 0.5, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          ABOUT ME
        </motion.h3>

        <motion.h1
          className="mt-2 text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          A little about me
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl leading-relaxed text-gray-300 text-justify"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          I’m a second-year B.Tech student who loves building real-world web
          applications from scratch — from clean user interfaces to solid
          backend logic.
        </motion.p>

        <motion.p
          className="mt-4 max-w-2xl leading-relaxed text-gray-300 text-justify"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          I focus on full-stack development, working with React, JavaScript, and
          Tailwind CSS on the frontend, and Node.js, Express, MongoDB, and MySQL
          on the backend to build secure and scalable systems.
        </motion.p>

        <motion.p
          className="mt-4 max-w-2xl leading-relaxed text-gray-300 text-justify"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Alongside development, I bring a creative edge through video editing
          and basic 3D tools, helping me build interfaces that don’t just work —
          they feel polished.
        </motion.p>

        <motion.div
          className="mt-8 max-w-2xl text-sm text-gray-400 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            <span className="text-white">Frontend:</span> React, JavaScript,
            Tailwind CSS
          </p>
          <p>
            <span className="text-white">Backend:</span> Node.js, Express.js
          </p>
          <p>
            <span className="text-white">Databases:</span> MongoDB, MySQL
          </p>
          <p>
            <span className="text-white">Auth & APIs:</span> JWT, REST APIs
          </p>
          <p>
            <span className="text-white">Tools:</span> Git, GitHub, Postman
          </p>
          <p>
            <span className="text-white">Creative:</span> Premiere Pro, After
            Effects, Blender (basic)
          </p>
        </motion.div>
      </div>

      {/* Cards */}
      <motion.div
        className="flex flex-wrap gap-10 mt-10"
        variants={parentStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.heading}
            variants={cardsFadeIn}
            custom={index}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 40px #e99b6388' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <InteractiveGradient
              className="w-72 h-[360px] cursor-pointer"
              glowColor="#e99b63"
            >
              <div className="p-4 text-black flex flex-col gap-5">
                <h2 className="text-2xl font-bold">{skill.heading}</h2>
                <p>{skill.description}</p>
                <span className="opacity-60">{skill.tagline}</span>
              </div>
            </InteractiveGradient>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Overview;
