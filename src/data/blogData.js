// Original images
import sustainableArch from '../assets/blog/sustainable_arch.png';
import constructionTips from '../assets/blog/construction_tips.png';
import solarIntegration from '../assets/blog/solar_integration.png';

// Generated images
import genArch from '../assets/blog/gen/blog_architecture_1777306041771.png';
import genConst from '../assets/blog/gen/blog_construction_1777306059248.png';
import genSolar from '../assets/blog/gen/blog_solar_1777306099624.png';

const templateGallery = [
  { type: 'single', image: sustainableArch },
  { type: 'text', title: 'I. The Core Philosophy', content: 'In every project we undertake, the philosophy remains the same: to create a space that is as functional as it is beautiful. This requires a deep understanding of the materials we use and the environment we build in. Our approach is rooted in traditional wisdom but enhanced by modern technology, ensuring that every home is a masterpiece of sustainable design.' },
  { type: 'double', images: [genArch, genSolar] },
  { type: 'text', title: 'II. Detailed Execution', content: 'The beauty of a home lies in its details. From the way light falls on a textured wall to the sound of footsteps on natural stone, every element is considered. We work closely with master craftsmen to ensure that every finish is perfect. This commitment to quality is what sets a Karrcholai home apart.' }
];

export const blogPosts = [
  // ── CONSTRUCTION TIPS (6) ──
  { id: 101, title: "Foundations for Longevity", category: "Construction Tips", date: "Jan 10, 2024", image: constructionTips, author: "Eng. Ramesh", excerpt: "Building a home that lasts for generations starts with the right foundation.", gallery: templateGallery },
  { id: 102, title: "Material Selection 101", category: "Construction Tips", date: "Jan 15, 2024", image: genConst, author: "Ar. Priya", excerpt: "Choosing the right materials for durability and aesthetics.", gallery: templateGallery },
  { id: 103, title: "The Art of Curing", category: "Construction Tips", date: "Jan 20, 2024", image: genArch, author: "Eng. Suresh", excerpt: "Why the curing process is critical for concrete strength.", gallery: templateGallery },
  { id: 104, title: "Weather-Proofing Your Home", category: "Construction Tips", date: "Jan 25, 2024", image: sustainableArch, author: "Ar. Vikram", excerpt: "Protecting your sanctuary from the elements.", gallery: templateGallery },
  { id: 105, title: "Optimizing Small Spaces", category: "Construction Tips", date: "Feb 01, 2024", image: genSolar, author: "Ar. Neha", excerpt: "Smart construction techniques for compact urban plots.", gallery: templateGallery },
  { id: 106, title: "Managing Site Logistics", category: "Construction Tips", date: "Feb 05, 2024", image: solarIntegration, author: "Eng. David", excerpt: "Ensuring a smooth workflow on busy construction sites.", gallery: templateGallery },

  // ── CLIENT STORIES (6) ──
  { id: 201, title: "The Ravi Residence", category: "Client Stories", date: "Feb 10, 2024", image: genConst, author: "Karrcholai Team", excerpt: "A modern agraharam in the heart of the city.", gallery: templateGallery },
  { id: 202, title: "The Nilgiri Retreat", category: "Client Stories", date: "Feb 15, 2024", image: genArch, author: "Karrcholai Team", excerpt: "A minimalist escape in the mountains.", gallery: templateGallery },
  { id: 203, title: "The Coastal Oasis", category: "Client Stories", date: "Feb 20, 2024", image: sustainableArch, author: "Karrcholai Team", excerpt: "Building for the sea breeze and salt air.", gallery: templateGallery },
  { id: 204, title: "The Heritage Revival", category: "Client Stories", date: "Feb 25, 2024", image: genSolar, author: "Karrcholai Team", excerpt: "Restoring an ancestral home for a new generation.", gallery: templateGallery },
  { id: 205, title: "The Urban Sanctuary", category: "Client Stories", date: "Mar 01, 2024", image: solarIntegration, author: "Karrcholai Team", excerpt: "A vertical garden home in a bustling neighborhood.", gallery: templateGallery },
  { id: 206, title: "The Zen Villa", category: "Client Stories", date: "Mar 05, 2024", image: constructionTips, author: "Karrcholai Team", excerpt: "A home designed for meditation and inner peace.", gallery: templateGallery },

  // ── RAINWATER HARVESTING (6) ──
  { id: 301, title: "Catching the Clouds", category: "Rainwater Harvesting", date: "Mar 10, 2024", image: genSolar, author: "Dr. Lakshmi", excerpt: "Advanced catchment systems for residential roofs.", gallery: templateGallery },
  { id: 302, title: "The Filtration Science", category: "Rainwater Harvesting", date: "Mar 15, 2024", image: genArch, author: "Eng. Raj", excerpt: "Ensuring every drop is pure and usable.", gallery: templateGallery },
  { id: 303, title: "Storage for Dry Months", category: "Rainwater Harvesting", date: "Mar 20, 2024", image: sustainableArch, author: "Dr. Mani", excerpt: "Optimizing tank capacity for seasonal resilience.", gallery: templateGallery },
  { id: 304, title: "Groundwater Recharge", category: "Rainwater Harvesting", date: "Mar 25, 2024", image: genConst, author: "Eng. Siva", excerpt: "Beyond the tank: replenishing the local water table.", gallery: templateGallery },
  { id: 305, title: "Greywater Integration", category: "Rainwater Harvesting", date: "Apr 01, 2024", image: solarIntegration, author: "Ar. Kavita", excerpt: "Closing the loop on domestic water usage.", gallery: templateGallery },
  { id: 306, title: "Maintenance of RWH Systems", category: "Rainwater Harvesting", date: "Apr 05, 2024", image: constructionTips, author: "Eng. Paul", excerpt: "Keeping your system efficient for years to come.", gallery: templateGallery },

  // ── SOLAR ENERGY (6) ──
  { id: 401, title: "Invisible Solar Power", category: "Solar Energy", date: "Apr 10, 2024", image: solarIntegration, author: "Dr. Surya", excerpt: "Integrating panels into architectural aesthetics.", gallery: templateGallery },
  { id: 402, title: "Off-Grid Resilience", category: "Solar Energy", date: "Apr 15, 2024", image: genSolar, author: "Eng. Arun", excerpt: "What it takes to be energy independent.", gallery: templateGallery },
  { id: 403, title: "The Battery Revolution", category: "Solar Energy", date: "Apr 20, 2024", image: genArch, author: "Dr. Deepa", excerpt: "Storing sunshine for the night hours.", gallery: templateGallery },
  { id: 404, title: "Solar Skylights", category: "Solar Energy", date: "Apr 25, 2024", image: sustainableArch, author: "Ar. Manoj", excerpt: "Letting in the light while generating power.", gallery: templateGallery },
  { id: 405, title: "Commercial vs Residential Solar", category: "Solar Energy", date: "May 01, 2024", image: genConst, author: "Eng. Ram", excerpt: "Choosing the right system for your project scale.", gallery: templateGallery },
  { id: 406, title: "Future of PV Technology", category: "Solar Energy", date: "May 05, 2024", image: constructionTips, author: "Dr. Rao", excerpt: "Next-gen solar solutions for the modern home.", gallery: templateGallery },

  // ── SUSTAINABLE LIVING (6) ──
  { id: 501, title: "The Breathable Wall", category: "Sustainable Living", date: "May 10, 2024", image: sustainableArch, author: "Ar. Anjali", excerpt: "Living with lime and earth plasters.", gallery: templateGallery },
  { id: 502, title: "Passive Cooling Secret", category: "Sustainable Living", date: "May 15, 2024", image: genArch, author: "Dr. Bose", excerpt: "Orientation and wind paths in South India.", gallery: templateGallery },
  { id: 503, title: "Traditional Thinnai", category: "Sustainable Living", date: "May 20, 2024", image: genConst, author: "Ar. Balu", excerpt: "Reviving the social threshold of the home.", gallery: templateGallery },
  { id: 504, title: "Modern Vastu Science", category: "Sustainable Living", date: "May 25, 2024", image: genSolar, author: "Dr. Raghavan", excerpt: "Harmonizing energy flow with functional design.", gallery: templateGallery },
  { id: 505, title: "Indoor-Outdoor Blurring", category: "Sustainable Living", date: "Jun 01, 2024", image: solarIntegration, author: "Ar. Meera", excerpt: "Creating seamless transitions to nature.", gallery: templateGallery },
  { id: 506, title: "Conscious Materialism", category: "Sustainable Living", date: "Jun 05, 2024", image: constructionTips, author: "Ar. Ishwar", excerpt: "Building with a conscience for the planet.", gallery: templateGallery }
];

export const categories = [
  "All Insights",
  "Construction Tips",
  "Client Stories",
  "Rainwater Harvesting",
  "Solar Energy",
  "Sustainable Living"
];
