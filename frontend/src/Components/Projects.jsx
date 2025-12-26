import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ✅ exact case + extension (prod-safe)
import { TeamCarousel } from "./lightswind/TeamCarousel.jsx";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/get-all-projects`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        const rawData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        const formattedProjects = rawData.map((proj) => ({
          id: proj?._id,
          name: proj?.name,
          role: proj?.role,
          bio: proj?.description,
          image: proj?.image,
        }));

        setProjects(formattedProjects);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching projects:", error);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  return (
    <section>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        whileInView={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
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
    </section>
  );
};

export default Projects;
