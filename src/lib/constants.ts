// Central configuration - all personal info, URLs, project data
// Update placeholder URLs before deploying

export const PERSONAL = {
  name: "Rudra",
  title: "Full-Stack Software Developer",
  email: "rudraah4k@gmail.com",
  locations: ["Jamui, Bihar", "Phagwara, Punjab"],
  summary: "Full-stack developer with hands-on experience building scalable REST APIs, secure authentication/RBAC systems, and admin dashboards using React and Node.js/Express.js. Comfortable owning features end-to-end \u2014 from database/ERD design through deployment \u2014 and collaborating with cross-functional stakeholders to translate business logic into working software.",
  heroDescription: "I build full-stack applications, secure APIs, dashboards and scalable product experiences using modern web technologies.",
  availability: "Available for opportunities",
} as const;

export const LINKS = {
  github: "https://github.com/rudraaaah4k",
  linkedin: "https://www.linkedin.com/in/rudra-singh-dev",
  email: `mailto:${PERSONAL.email}`,
  resume: "/resume.pdf",
} as const;

export const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const METRICS = [
  { value: 8.01, label: "CGPA", suffix: "", decimals: 2 },
  { value: 2, label: "Full-Stack Projects", suffix: "+", decimals: 0 },
  { value: 1, label: "Dev Simulation", suffix: "+", decimals: 0 },
] as const;

export interface Project {
  id: string; number: string; title: string; label: string;
  description: string; longDescription: string; features: string[];
  tech: string[]; links: { github: string; live: string };
  architectureFlow: string[]; color: string; problem: string;
  solution: string; architecture: string; security: string;
  deployment: string; challenges: string;
}

export const PROJECTS: Project[] = [
  {
    id: "grocery-os", number: "01", title: "Grocery OS", label: "FULL-STACK SAAS",
    description: "Full-stack grocery store management platform with dedicated customer and administrator workflows.",
    longDescription: "A comprehensive grocery store management SaaS platform that provides end-to-end workflows for both customers and store administrators.",
    features: ["Product management","Inventory management","Order processing","Coupon system","Store settings","JWT Authentication","Role-Based Access Control","Admin dashboard","Multi-tenant architecture"],
    tech: ["React","TypeScript","Node.js","Express.js","Prisma","PostgreSQL","Tailwind CSS","JWT","Git/GitHub"],
    links: { github: "https://github.com/rudraaaah4k/Grocery_Os", live: "https://grocery-os-beta.vercel.app" },
    architectureFlow: ["React Frontend","REST API","Express.js Server","Auth / RBAC","Prisma ORM","PostgreSQL"],
    color: "#6366f1",
    problem: "Small and mid-size grocery stores lack affordable, integrated digital tools to manage inventory, orders, and customer interactions.",
    solution: "Built a full-stack SaaS platform with dedicated customer-facing and admin workflows, secure authentication, role-based access control, and a real-time admin dashboard.",
    architecture: "Three-tier architecture: React SPA frontend communicating with a RESTful Express.js API, backed by PostgreSQL through Prisma ORM. JWT-based authentication with refresh token rotation and RBAC middleware.",
    security: "JWT access + refresh tokens, bcrypt password hashing, RBAC middleware, input validation and sanitization, CORS configuration, rate limiting.",
    deployment: "Frontend deployed on Vercel, backend on Render, database on managed PostgreSQL. Environment-based configuration with CI/CD pipeline.",
    challenges: "Designing a flexible multi-tenant data model, implementing secure token refresh flows, building a responsive admin dashboard with real-time inventory updates.",
  },
  {
    id: "civic-pulse", number: "02", title: "Civic Pulse", label: "FULL-STACK PLATFORM",
    description: "Citizen feedback analysis platform designed to collect, classify and visualize community feedback.",
    longDescription: "A civic technology platform that enables citizens to submit feedback about their communities, which is then automatically classified by sentiment, emotion, urgency, and topic.",
    features: ["Image submissions","Location data","Priority classification","Anonymous submissions","Sentiment analysis","Emotion classification","Urgency detection","Spam detection","Topic classification","Admin dashboard","JWT authentication","Docker deployment"],
    tech: ["React","TypeScript","Node.js","Express.js","MongoDB","JWT","Tailwind CSS","Docker"],
    links: { github: "https://github.com/rudraaaah4k/CITIZEN-FEEDBACK-DASHBOARD", live: "https://citizen-feedback-dashboard.vercel.app" },
    architectureFlow: ["Citizen Feedback","Classification Engine","Analytics Pipeline","Admin Action"],
    color: "#8b5cf6",
    problem: "Municipal governments struggle to efficiently collect, categorize, and act on citizen feedback at scale.",
    solution: "Built a full-stack platform with automated feedback classification, location-aware submissions, and an admin dashboard for visualization and action tracking.",
    architecture: "React frontend with TypeScript, Express.js REST API, MongoDB for flexible document storage. Classification pipeline processes submissions through multiple analysis stages.",
    security: "JWT authentication, anonymous submission support, input validation, image upload sanitization, Docker container isolation.",
    deployment: "Containerized with Docker for consistent development and production environments. Frontend on Vercel, API server and MongoDB on Docker Compose.",
    challenges: "Designing an accurate multi-label classification pipeline, handling image uploads with location metadata, building real-time analytics visualizations.",
  },
];

export interface Experience { title: string; company: string; period: string; details: string[]; }
export const EXPERIENCES: Experience[] = [{
  title: "Software Development Job Simulation", company: "Forage \u00d7 Datacom", period: "Jul 2026 \u2013 Aug 2026",
  details: [
    "Completed practical software development tasks simulating real-world enterprise engineering workflows.",
    "Reviewed software components in code reviews.",
    "Diagnosed software defects and implemented bug fixes.",
    "Validated functionality through structured testing and debugging.",
  ],
}];

export interface SkillCategory { title: string; skills: string[]; }
export const SKILL_CATEGORIES: SkillCategory[] = [
  { title: "WEB & APIs", skills: ["React.js","Node.js","Express.js","REST APIs","HTML","CSS","Tailwind CSS"] },
  { title: "DATABASES", skills: ["PostgreSQL","MongoDB","SQL/MySQL","Prisma","ERD Design"] },
  { title: "AUTH & SECURITY", skills: ["JWT","Bcrypt","RBAC","Input Validation"] },
  { title: "PROGRAMMING", skills: ["Java","C++","Python","JavaScript","DSA","OOP","Complexity Analysis"] },
  { title: "TOOLS & DEPLOYMENT", skills: ["Git","GitHub","Docker","Vite","MongoDB Atlas","Vercel","Render","TanStack Query","Chart.js"] },
];

export interface ArchitectureLayer { label: string; technologies: string[]; description: string; }
export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  { label: "USER", technologies: ["Browser","Mobile"], description: "The end user interacts with the application through a responsive web interface." },
  { label: "REACT", technologies: ["React","TypeScript","Tailwind CSS","TanStack Query"], description: "Component-based frontend with type-safe code, modern styling, and efficient server state management." },
  { label: "API", technologies: ["REST","JSON","HTTP","Axios"], description: "RESTful API layer handling client-server communication with structured request/response patterns." },
  { label: "NODE / EXPRESS", technologies: ["Node.js","Express.js","Middleware","Controllers"], description: "Server-side application logic with modular middleware, route controllers, and service layers." },
  { label: "AUTH / RBAC", technologies: ["JWT","Bcrypt","RBAC","Refresh Tokens"], description: "Secure authentication with hashed passwords, token-based sessions, and role-based access control." },
  { label: "DATABASE", technologies: ["PostgreSQL","MongoDB","Prisma","ERD"], description: "Persistent data storage with ORM-driven schema management and optimized query patterns." },
  { label: "DOCKER / DEPLOY", technologies: ["Docker","Vercel","Render","GitHub Actions"], description: "Containerized deployments with CI/CD pipelines, managed hosting, and environment configuration." },
];

export interface Certification { title: string; issuer: string; date: string; }
export const CERTIFICATIONS: Certification[] = [
  { title: "Oracle AI Database Certified Foundations Associate", issuer: "Oracle", date: "Aug 2026" },
  { title: "Data Structures and Algorithms", issuer: "Iamneo", date: "Jun 2026" },
  { title: "Programming Using C++", issuer: "Infosys", date: "Aug 2025" },
];

export interface EducationItem { institution: string; degree: string; period: string; grade: string; }
export const EDUCATION: EducationItem[] = [
  { institution: "Lovely Professional University", degree: "Bachelor's in Computer Science and Engineering", period: "2024\u20132028", grade: "CGPA: 8.01" },
  { institution: "St. Joseph's School", degree: "Matriculation", period: "2020\u20132021", grade: "80%" },
];
