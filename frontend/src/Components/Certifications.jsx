import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ------------------ Animation Variants ------------------ */

const containerVar = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVar = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/* ------------------ Component ------------------ */

const Certifications = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCertifications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/get-all-certificates`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch certificates");

        const data = await res.json();

        if (Array.isArray(data)) {
          setCerts(data);
        } else if (Array.isArray(data?.data)) {
          setCerts(data.data);
        } else if (Array.isArray(data?.certificates)) {
          setCerts(data.certificates);
        } else {
          setCerts([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching certificates:", err);
        }
      }
    };

    fetchCertifications();

    return () => controller.abort();
  }, []);

  return (
    <section className="ml-10 mr-11">
      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="font-extrabold tracking-wide text-7xl flex justify-center mb-12"
      >
        CERTIFICATIONS
      </motion.h1>

      {/* Cards */}
      <motion.div
        variants={containerVar}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-25 mt-15"
      >
        {certs.map((cert, idx) => (
          <motion.div
            key={cert?._id ?? idx}
            variants={itemVar}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="border-2 h-72 w-full rounded-3xl bg-[#383736] p-4 flex flex-col justify-between cursor-pointer transition hover:shadow-[0_10px_30px_#e99b63]"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
              {cert?.image && (
                <img
                  src={cert.image}
                  alt={cert.issuer || "certificate"}
                  className="w-16 h-16 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <h3 className="text-xl font-bold text-white">
                {cert?.title || "Untitled Certificate"}
              </h3>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2 text-white p-2">
              <div className="flex gap-3">
                <span className="font-bold">Issuer:</span>
                <span>{cert?.issuer || "—"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-bold">Credential ID:</span>
                <span>{cert?.id || "—"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-bold">Date:</span>
                <span>{cert?.date || "—"}</span>
              </div>
            </div>

            {/* CTA */}
            {cert?.link && (
              <div className="flex justify-center mt-3">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border h-10 w-32 flex items-center justify-center rounded-xl font-bold text-white transition hover:bg-[#e99b63] hover:text-black hover:scale-110"
                >
                  Verify
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Certifications;
