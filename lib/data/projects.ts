export type ProjectNarrative = {
  challenge?: string;
  approach?: string;
  whatWeBuilt?: string;
  outcome?: string;
};

export type Project = {
  slug: string;
  client: string;
  headline: string;
  featuredTags: string[];
  workTags: string[];
  workSummary: string;
  ctaLabel: "View Case Study" | "View Project";
  narrative: ProjectNarrative;
  focusAreas: string[];
};

export const projects: Project[] = [
  {
    slug: "onpoint-clothing",
    client: "OnPoint Clothing",
    headline: "Creating a digital shopping experience for a fashion house.",
    featuredTags: ["Ecommerce", "Web Development", "Digital Experience"],
    workTags: ["Fashion", "Ecommerce", "Web"],
    workSummary: "Creating a digital shopping experience for a fashion house.",
    ctaLabel: "View Case Study",
    narrative: {
      challenge: "OnPoint needed more than a catalogue of products online.",
      approach:
        "The goal was to create a digital experience that could present the brand, its collections and its work in a way that felt considered while also giving customers a straightforward way to shop.",
      whatWeBuilt: "Kuvah designed and developed an ecommerce platform around that experience.",
    },
    focusAreas: ["Ecommerce", "Web Development", "Digital Experience"],
  },
  {
    slug: "dillon-gas",
    client: "Dillon Gas",
    headline: "Bringing gas ordering closer to the customer.",
    featuredTags: ["Mobile Development", "Product Development"],
    workTags: ["Mobile", "Product"],
    workSummary: "Making it easier for customers to interact with gas services.",
    ctaLabel: "View Project",
    narrative: {
      challenge: "Dillon Gas needed a more convenient way for customers to interact with its services.",
      whatWeBuilt:
        "We worked on the digital product experience that would help make ordering and managing gas services easier.",
    },
    focusAreas: ["Mobile Development", "Product Development"],
  },
  {
    slug: "whatsapp-automation-platform",
    client: "WhatsApp Automation Platform",
    headline: "Helping businesses manage conversations beyond one phone.",
    featuredTags: ["Web Application", "Automation", "Backend Systems"],
    workTags: ["Software", "Automation"],
    workSummary: "Giving businesses a better way to manage customer communication.",
    ctaLabel: "View Project",
    narrative: {
      challenge: "As customer communication grows, managing everything manually becomes difficult.",
      whatWeBuilt:
        "We worked on a platform designed to give businesses a better way to manage and automate WhatsApp communication.",
    },
    focusAreas: ["Web Application", "Automation", "Backend Systems"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function narrativeParagraphs(project: Project): string[] {
  const { challenge, approach, whatWeBuilt, outcome } = project.narrative;
  return [challenge, approach, whatWeBuilt, outcome].filter(
    (value): value is string => Boolean(value)
  );
}
