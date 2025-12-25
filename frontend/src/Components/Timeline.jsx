import { ScrollTimeline } from "./lightswind/scroll-timeline";

const events = [
  {
    year: "Sep 2025 - Present",
    title: "Volunteer",
    subtitle: "Google Developer Club - MM(DU)",
    description:
      "Working closely with GDG leads and Google’s global developer community to foster innovation.",
  },
  {
    year: "Nov 2024 - July 2025",
    title: "Social Media Manager and Video Editor",
    subtitle: "Alpha Intern",
    description: 'Created engaging video content and campaigns using Premiere Pro & After Effects to grow brand visibility and engagement. 6M+ Reach on Instagram and 3k+ Subscribers on Youtube.',
  },
  {
    year: "September 2024 - July 2025",
    title: "Co-Leader",
    subtitle: "Alpha Intern MM(DU) Community",
    description: "Led and mentored peers while organizing community events, enhancing leadership and teamwork skills.",
  },
  {
    year: "April 2025 - May 2025",
    title: "Summer Intern",
    subtitle: "Cognifyz Technologies",
    description: "Developed hands-on C++ projects, applying debugging, problem-solving, and industry best practices.",
  },
];

function Timeline() {
  return (
    <div>
      <ScrollTimeline
        events={events}
        title="Experience"
        subtitle="Here is the Technical and Non-Technical I hold"
        progressIndicator={true}
        cardAlignment="alternating"
        revealAnimation="fade"
        className="mt-[-51%] "
      />
    </div>
  );
}

export default Timeline;
