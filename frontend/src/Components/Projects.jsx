import React, { useEffect, useState } from 'react';
import { TeamCarousel } from './lightswind/team-carousel';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/get-all-projects`)
      .then((response) => response.json())
      .then((data) => {
        const rawData = Array.isArray(data) ? data : data.data || [];
        const formattedProject = rawData.map((proj) => ({
          id: proj._id,
          name: proj.name,
          role: proj.role,
          bio: proj.description,
          image: proj.image,
        }));
        setProjects(formattedProject);
      })
      .catch(() => console.log('Error fetching projects', proj));
  }, []);
  return (
    <div>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        whileInView={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mb-25"
      >
        <TeamCarousel
          members={projects}
          title="Projects"
          titleSize="2xl"
          titleColor="#e99b63"
          infoTextColor="#e99b65"
          infoBackground="rgba(0,0,0,0.92)"
          showArrows  
        />
      </motion.div>
    </div>
  );
};

export default Projects;
