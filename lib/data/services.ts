export type ServiceCapability = {
  name: string;
  description?: string;
};

export type Service = {
  slug: "digital-experiences" | "digital-products" | "systems-automation";
  number: string;
  name: string;
  homeIntro: string[];
  homeCapabilities: string[];
  homeCtaLabel: string;
  pageHeadline: string;
  pageIntro: string[];
  pageCapabilities: ServiceCapability[];
  pageCtaLabel: string;
};

export const services: Service[] = [
  {
    slug: "digital-experiences",
    number: "01",
    name: "Digital Experiences",
    homeIntro: [
      "Your website is more than somewhere people visit.",
      "It's where people learn who you are, decide whether they trust you and choose what to do next.",
      "We create websites and digital experiences that help businesses communicate clearly and give customers a better way to engage with what they offer.",
    ],
    homeCapabilities: ["Business Websites", "Ecommerce", "Landing Pages", "Website Redesigns"],
    homeCtaLabel: "Explore Digital Experiences",
    pageHeadline: "Give people a better way to experience your business.",
    pageIntro: [
      "For many people, your website is their first real interaction with your business.",
      "We help you create an online experience that reflects your work, communicates what you offer and makes it easier for people to take the next step.",
    ],
    pageCapabilities: [
      { name: "Business Websites", description: "A clear, well-built home for your business online." },
      { name: "Ecommerce", description: "Online shopping experiences designed around your products and customers." },
      { name: "Landing Pages", description: "Focused pages for products, services, campaigns and specific actions." },
      {
        name: "Website Redesigns",
        description: "For businesses that have outgrown their current website or need a better experience.",
      },
    ],
    pageCtaLabel: "Start a Website Project",
  },
  {
    slug: "digital-products",
    number: "02",
    name: "Digital Products",
    homeIntro: [
      "Good products don't need to start big.",
      "Sometimes you need to test an idea. Sometimes you need to build the first version of something. Sometimes you already know what needs to exist and need the right people to build it.",
      "We help turn ideas and opportunities into digital products people can actually use.",
    ],
    homeCapabilities: ["SaaS MVPs", "Web Applications", "Internal Tools", "Product Development"],
    homeCtaLabel: "Explore Digital Products",
    pageHeadline: "Take an idea beyond the idea stage.",
    pageIntro: [
      "An idea can become a lot of things.",
      "The challenge is deciding what it should become first.",
      "We help founders and businesses think through the product, identify the important parts and build a version people can begin using.",
    ],
    pageCapabilities: [
      { name: "SaaS MVPs", description: "Build and test the first version of a software product." },
      { name: "Web Applications", description: "Custom applications built around a specific need or use case." },
      { name: "Internal Tools", description: "Tools that help teams manage work, information and processes." },
      {
        name: "Product Development",
        description: "Ongoing support for businesses building and improving digital products.",
      },
    ],
    pageCtaLabel: "Talk About Your Product",
  },
  {
    slug: "systems-automation",
    number: "03",
    name: "Systems & Automation",
    homeIntro: [
      "There comes a point when doing everything manually stops making sense.",
      "If your team is repeating the same tasks, moving information between different tools or spending too much time on processes that could work better, we can help.",
      "We design and build systems that make everyday work simpler.",
    ],
    homeCapabilities: [
      "Business Automation",
      "Customer Workflows",
      "Internal Systems",
      "Dashboards",
      "Custom Solutions",
    ],
    homeCtaLabel: "Explore Systems & Automation",
    pageHeadline: "Make the work behind your business work better.",
    pageIntro: [
      "Many businesses rely on people doing the same things over and over again.",
      "Following up with customers. Moving information between platforms. Updating records. Managing requests.",
      "Some of that work needs people.",
      "Some of it doesn't.",
      "We help businesses identify where better systems and automation can make a real difference.",
    ],
    pageCapabilities: [
      { name: "Business Workflows" },
      { name: "Customer Communication Systems" },
      { name: "Internal Dashboards" },
      { name: "Process Automation" },
      { name: "Custom Business Tools" },
    ],
    pageCtaLabel: "Explore What's Possible",
  },
];
