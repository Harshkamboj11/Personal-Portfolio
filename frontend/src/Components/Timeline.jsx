import React from "react";

// ✅ exact case + extension (Linux/Vercel safe)
import { ScrollTimeline } from "./lightswind/ScrollTimeline.jsx";

/* ------------------ Data ------------------ */

const events = [
  {
    year: "Sep 2025 – Present",
    title: "Volunteer",
    subtitle: "Google Developer Club - MM(DU)",
    description:
      "Working closely with GDG leads and Google’s global developer community to foster innovation.",
  },
  {
    year: "Nov 2024 – July 2025",
    title: "Social Media Manager & Video Editor",
    subtitle: "Alpha Intern",
    description:
      "Created engaging video content and campaigns using Premiere Pro & After Effects, achieving 6M+ Instagram reach and 3k+ YouTube subscribers.",
  },
  {
    year: "Sep 2024 – July 2025",
    title: "Co-Leader",
    subtitle: "Alpha Intern MM(DU) Community",
    description:
      "Led and mentored peers while organizing community events, strengthening leadership and teamwork skills.",
  },
  {
    year: "Apr 2025 – May 2025",
    title: "Summer Intern",
    subtitle: "Cognifyz Technologies",
    description:
      "Developed hands-on C++ projects, applying debugging, problem-solving, and industry best practices.",
  },
];

/* ------------------ Component ------------------ */

const Timeline = () => {
  return (
    <section>
      <ScrollTimeline
        events={events}
        title="Experience"
        subtitle="Here is the technical and non-technical experience I hold"
        progressIndicator
        cardAlignment="alternating"
        revealAnimation="fade"
        className="mt-[-50%]"
      />
    </section>
  );
};

export default Timeline;
