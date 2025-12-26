import React, { useState } from "react";
import "../index.css"; // ✅ case-safe (make sure file name is index.css)
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion"; // ✅ FIXED (was motion/react ❌)
import { HamburgerMenuOverlay } from "./lightswind/HamburgerMenuOverlay.jsx"; // ✅ exact case + extension

/* ------------------ Component ------------------ */

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const toggle = () => setToggleMenu((prev) => !prev);

  const menuItems = [
    { label: "Home", onClick: () => scrollToSection("home") },
    { label: "Projects", onClick: () => scrollToSection("projects") },
    { label: "About", onClick: () => scrollToSection("about") },
    { label: "Contact", onClick: () => scrollToSection("contact") },
    { label: "Resume", onClick: () => window.open("/resume.pdf", "_blank") },
  ];

  const list = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <header
      className="
        fixed top-6 left-6 right-6 z-50
        flex items-center justify-between
        px-3 py-3 sm:px-6 lg:px-14
        rounded-full backdrop-blur-md
        bg-black/30 shadow-md
      "
    >
      {/* Desktop Navigation */}
      <motion.ul
        className="hidden lg:flex items-center gap-10 xl:gap-16 ml-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {list.map((item) => (
          <motion.li
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="
              relative cursor-pointer text-white text-sm xl:text-base
              after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-[#e99b63]
              after:w-0 after:transition-all after:duration-300
              hover:after:w-full
            "
            variants={itemVariants}
          >
            {item.name}
          </motion.li>
        ))}
      </motion.ul>

      {/* Mobile Menu Button */}
      <button
        className="
          lg:hidden z-50
          p-2 rounded-full text-3xl
          transition-all duration-200
          hover:bg-black hover:text-[#e99b63]
        "
        onClick={toggle}
      >
        <HamburgerMenuOverlay
          items={menuItems}
          buttonSize="md"
          fontSize="xl"
          staggerDelay={0.08}
          animationDuration={1.2}
          overlayBackground="#e99b63"
          buttonColor="transparent"
          className="backdrop-blur-md bg-black/30"
        />
      </button>

      {/* Resume Button */}
      <motion.button
        onClick={() => window.open("/resume.pdf", "_blank")}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="
          hidden sm:block
          bg-[#a7a7a7] text-black
          px-5 py-2 sm:px-6 sm:py-2.5
          rounded-full font-medium text-lg
          transition-all duration-300
          hover:bg-white hover:scale-95 cursor-pointer
        "
      >
        Resume
      </motion.button>

      {/* Mobile Menu Overlay */}
      {toggleMenu && (
        <div
          className="
            fixed inset-0 top-16 z-40
            md:hidden
            bg-black/70 backdrop-blur
            flex items-center justify-center
          "
        >
          <nav>
            <ul className="flex flex-col gap-8 text-lg text-white text-center">
              {list.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    toggle();
                  }}
                  className="
                    cursor-pointer
                    transition-colors duration-200
                    hover:text-[#e99b63]
                  "
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
