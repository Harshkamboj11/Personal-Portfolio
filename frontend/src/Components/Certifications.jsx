import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Variants for fade-up + blur transition with stagger
const containerVar = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVar = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Certifications = () => {
  const [certs, setCertificate] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/get-all-certificates`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        // FIX: Check if data is array, or if it's inside 'data.data' or 'data.certificates'
        if (Array.isArray(data)) {
          setCertificate(data);
        } else if (data.data && Array.isArray(data.data)) {
          setCertificate(data.data);
        } else if (data.certificates && Array.isArray(data.certificates)) {
          setCertificate(data.certificates);
        } else {
          setCertificate([]);
        }
      })
      .catch((err) => console.error("unable to fetch data", err));
  }, []);

  return (
    <div>
      <div className="ml-10 mr-11">
        <motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="font-extrabold tracking-wide ml-25 mr-25 text-7xl justify-center flex mb-12"
          >
            CERTIFICATIONS
          </motion.h1>
        </motion.div>
        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-25 mb-25 mr-25 mt-15"
        >
          {/* FIX: Ensure certs is an array before mapping */}
          {Array.isArray(certs) && certs.map((cert, idx) => (
            <motion.div
              key={cert._id || idx}
              variants={itemVar}
              // FIX: Changed invalid hover:boxShadow to valid hover:shadow-[...]
              className="border-2 h-72 w-full rounded-3xl hover:shadow-[0_10px_30px_#e99b63] transition cursor-pointer p-4 bg-[#383736] flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              {/* Logo and Title */}
              <div className="flex items-center gap-4 mb-2">
                {cert.image ? (
                    <img
                    src={`${cert.image}`}
                    alt={cert.issuer}
                    className="w-16 h-16 rounded-xl"
                    onError={(e) => (e.target.style.display = "none")}
                    />
                ) : null}
                
                <h3 className="text-xl font-bold mt-2 text-white">
                  {cert.title}
                </h3>
              </div>
              {/* Details */}
              <div className="flex flex-col p-2 gap-2 text-white">
                <div className="flex gap-3">
                  <span className="font-bold">Issuer:</span>
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Credential ID:</span>
                  <span>{cert.id}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Date:</span>
                  <span>{cert.date}</span>
                </div>
              </div>
              {/* Verify Button */}
              <div className="flex justify-center mt-3">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="border h-10 w-32 flex justify-center items-center hover:text-black text-white hover:bg-[#e99b63] p-1.5 hover:scale-110 transition cursor-pointer rounded-xl font-bold"
                >
                  Verify
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;