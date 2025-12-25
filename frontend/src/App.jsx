import { useState } from 'react';
import './index.css';
import Hero_bg from './Components/Hero_bg';
import Hero from './Components/Hero';
import Overview from './Components/Overview';
import { ScrollTimeline } from './Components/lightswind/scroll-timeline';
import Timeline from './Components/timeline';
import Lamp from './Components/lamp';
import LogoMarquee from './Components/LogoMarquee';
import Projects from './Components/Projects';
import Certifications from './Components/Certifications';
// import Contact from "./Components/Contact";
import ContactForm from './Components/Contact';
import Footer from './Components/Footer';
function App() {
  return (
    <div>
      <section id="home">
        <Hero_bg />
        <Hero />
      </section>

      <section id="about">
        <Overview />
      </section>

      <section id="experience">
        <Lamp />
        <Timeline />
      </section>

      <section id="skills">
        <LogoMarquee />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="certifications">
        <Certifications />
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}

export default App;
