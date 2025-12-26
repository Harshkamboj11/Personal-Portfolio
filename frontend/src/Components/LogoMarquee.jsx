import React from 'react';

// Import the actual implementation (case-sensitive)
import { SlidingLogoMarquee } from './lightswind/sliding-logo-marquee';

// ✅ logo imports (paths must match EXACTLY)
import css from './logos/css.png';
import framer from './logos/framer.png';
import github from './logos/github.png';
import html from './logos/html.png';
import js from './logos/js.png';
import linkedin from './logos/linkedin.png';
import mongo from './logos/MongoDB.png';
import next from './logos/next.png';
import node from './logos/node.png';
import react from './logos/react.png';
import tailwind from './logos/tailwind.png';

/* ------------------ Logo Data ------------------ */

const logos = [
  { id: '1', src: css, invert: true },
  { id: '2', src: framer, invert: true },
  { id: '3', src: github, invert: true },
  { id: '4', src: html, invert: true },
  { id: '5', src: js, invert: true },
  { id: '6', src: linkedin, invert: true },
  { id: '7', src: mongo, invert: false },
  { id: '8', src: next, invert: true },
  { id: '9', src: node, invert: false },
  { id: '10', src: react, invert: true },
  { id: '11', src: tailwind, invert: true },
].map((logo) => ({
  id: logo.id,
  content: (
    <img
      src={logo.src}
      alt="technology logo"
      className={`h-[60px] ${logo.invert ? 'invert' : ''}`}
      loading="lazy"
      draggable={false}
    />
  ),
}));

/* ------------------ Component ------------------ */

const LogoMarquee = () => {
  return (
    <section className="bg-black p-6 mx-6 lg:mx-25 text-3xl">
      <div className="mb-25 -mt-10">
        <SlidingLogoMarquee
          items={logos}
          speed={40}
          height="100px"
          enableBlur
          blurIntensity={2}
          pauseOnHover
          showGridBackground
          showControls={false}
          onItemClick={(item) => console.log('Clicked:', item.id)}
        />
      </div>
    </section>
  );
};

export default LogoMarquee;
