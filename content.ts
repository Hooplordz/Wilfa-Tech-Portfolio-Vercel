import portraitUrl from "./favour.webp";

// All site copy lives here. Edit this file only; the components read from it.
// Anything marked REPLACE is a placeholder, not a claim.

export const site = {
  name: "Favour Williams",
  brand: "WILFA TECH",
  role: "Founder, WILFA TECH",
  intro:
    "I design and build robots, AI systems and connected devices, and the software that ties them together.",
  email: "williamsfavouroluwasemilore@gmail.com",
  portrait: portraitUrl,
  github: "https://github.com/Hooplordz",
  linkedin: "https://www.linkedin.com/in/your-handle", // REPLACE with your LinkedIn URL
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// REPLACE every value with a real figure, then set placeholder to false.
export const stats = [
  { value: 4, suffix: "", label: "Focus areas", placeholder: false },
  { value: 10, suffix: "+", label: "Projects built", placeholder: true },
  { value: 5, suffix: "", label: "Technologies in daily use", placeholder: true },
  { value: 3, suffix: "+", label: "Years building", placeholder: true },
];

export const ticker = [
  "Robotics",
  "Artificial Intelligence",
  "IoT",
  "Engineering",
  "Innovation",
  "Software Development",
];

export type Project = {
  name: string;
  category: string;
  role: string;
  description: string;
  tech: string[];
  visual: "home" | "robot" | "iot" | "ai";
  image?: string; // optional: path or URL, replaces the generated visual
  live: string;
  caseStudy: string;
  sample: boolean; // true shows a "Sample" badge. Set false once the project is real.
};

export const projects: Project[] = [
  {
    name: "Smart Home Automation",
    category: "Home & Building",
    role: "REPLACE: your actual role",
    description: "Sample entry. Describe what the system controls and the problem it solves.",
    tech: ["ESP32", "MQTT", "React"],
    visual: "home",
    live: "#",
    caseStudy: "#",
    sample: true,
  },
  {
    name: "Robotics and Autonomous Systems",
    category: "Robotics",
    role: "REPLACE: your actual role",
    description: "Sample entry. Describe the robot, what it senses and how it decides.",
    tech: ["Python", "ROS", "Computer Vision"],
    visual: "robot",
    live: "#",
    caseStudy: "#",
    sample: true,
  },
  {
    name: "IoT Monitoring Systems",
    category: "Industrial & Environmental",
    role: "REPLACE: your actual role",
    description: "Sample entry. Describe the sensors, the data pipeline and the dashboard.",
    tech: ["Sensors", "Node.js", "TypeScript"],
    visual: "iot",
    live: "#",
    caseStudy: "#",
    sample: true,
  },
  {
    name: "AI-Powered Applications",
    category: "Artificial Intelligence",
    role: "REPLACE: your actual role",
    description: "Sample entry. Describe the model or API used and what the app does for people.",
    tech: ["TypeScript", "LLM APIs", "React"],
    visual: "ai",
    live: "#",
    caseStudy: "#",
    sample: true,
  },
];

export const expertise = [
  { group: "Robotics", items: ["Autonomous navigation", "Motor and servo control", "Sensor fusion", "ROS"] },
  { group: "Artificial Intelligence", items: ["Machine learning", "Computer vision", "LLM applications", "Data pipelines"] },
  { group: "Internet of Things", items: ["ESP32 and Arduino", "MQTT", "Edge devices", "Real-time dashboards"] },
  { group: "Software Engineering", items: ["React", "TypeScript", "Node.js", "APIs and databases"] },
];

export const about = {
  statement: "Engineering that senses, decides and moves.",
  paragraphs: [
    "REPLACE: two or three sentences on how you got into engineering and what drives you.",
    "WILFA TECH exists to turn robotics, AI and IoT ideas into dependable, practical products.",
  ],
  facts: [
    { k: "Education", v: "REPLACE: school, programme and years" },
    { k: "Journey", v: "REPLACE: key moments, first builds, competitions, roles" },
    { k: "Ambition", v: "REPLACE: where you want WILFA TECH to be in five years" },
  ],
};
