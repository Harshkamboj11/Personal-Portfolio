import { SlidingLogoMarquee } from "./lightswind/sliding-logo-marquee";
import css from "./logos/css.png";
import framer from "./logos/framer.png";
import github from "./logos/github.png";
import html from "./logos/html.png";
import linkedin from "./logos/linkedin.png";
import mongo from "./logos/MongoDB.png";
import next from "./logos/next.png";
import node from "./logos/node.png";
import react from "./logos/react.png";
import tailwind from "./logos/tailwind.png";
import js from "./logos/js.png";

const logos = [
  {
    id: "1",
    content: <img src={css} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "2",
    content: <img src={framer} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "3",
    content: <img src={github} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "4",
    content: <img src={html} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "5",
    content: <img src={js} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "6",
    content: <img src={linkedin} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "7",
    content: <img src={mongo} alt="Logo" className="h-15" />,
  },
  {
    id: "8",
    content: <img src={next} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "9",
    content: <img src={node} alt="Logo" className="h-15 " />,
  },
  {
    id: "10",
    content: <img src={react} alt="Logo" className="h-15 filter invert" />,
  },
  {
    id: "11",
    content: <img src={tailwind} alt="Logo" className="h-15 filter invert" />,
  },
];

export default function LogoMarquee() {
  return (
    <div className="text-3xl ml-25 mr-25 bg-black p-6 ">
      <div className="mb-25 -mt-10">
        <SlidingLogoMarquee
          items={logos}
          speed={40}
          height="100px"
          enableBlur={true}
          blurIntensity={2}
          pauseOnHover={true}
          showGridBackground={true}
          showControls={false}
          onItemClick={(item) => console.log("Clicked:", item.id)}
        />
      </div>
    </div>
  );
}
