import React from "react";
import "../index.css"; // ✅ case-safe (must be index.css)
import gradient from "../Images/gradient.png"; // ✅ image import is fine
import Header from "./Header.jsx"; // ✅ explicit extension + exact case

const HeroBg = () => {
  return (
    <main className="relative overflow-hidden">
      {/* Gradient background image */}
      <img
        src={gradient}
        alt="gradient background"
        loading="lazy"
        className="absolute top-0 right-0 opacity-60 -z-10 pointer-events-none"
      />

      {/* Blur glow background */}
      <div
        className="
          h-0 w-[40rem]
          absolute top-[20%] right-[-5%]
          shadow-[0_0_900px_20px_#e99b63]
          -rotate-[30deg]
          -z-10
          pointer-events-none
        "
      />

      <Header />
    </main>
  );
};

export default HeroBg;
