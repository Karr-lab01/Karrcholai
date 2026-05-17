// Original images
import sustainableArch from '../assets/blog/sustainable_arch.png';
import constructionTips from '../assets/blog/construction_tips.png';
import solarIntegration from '../assets/blog/solar_integration.png';

// Generated images
import genArch from '../assets/blog/gen/blog_architecture_1777306041771.png';
import genConst from '../assets/blog/gen/blog_construction_1777306059248.png';
import genSolar from '../assets/blog/gen/blog_solar_1777306099624.png';

import visvesvarayaImage from '../../assets/visvesvaraya.webp';
import vis2 from '../../assets/vis2.jpg';
import vis3 from '../../assets/vis3.webp';
import vis4 from '../../assets/vis4.webp';

const templateGallery = [
  { type: 'single', image: sustainableArch },
  { type: 'text', title: 'I. The Core Philosophy', content: 'In every project we undertake, the philosophy remains the same: to create a space that is as functional as it is beautiful. This requires a deep understanding of the materials we use and the environment we build in. Our approach is rooted in traditional wisdom but enhanced by modern technology, ensuring that every home is a masterpiece of sustainable design.' },
  { type: 'double', images: [genArch, genSolar] },
  { type: 'text', title: 'II. Detailed Execution', content: 'The beauty of a home lies in its details. From the way light falls on a textured wall to the sound of footsteps on natural stone, every element is considered. We work closely with master craftsmen to ensure that every finish is perfect. This commitment to quality is what sets a Karrcholai home apart.' }
];

export const blogPosts = [
  // ── ENGINEERING LEGENDS ──
  { 
    id: 601, 
    title: "Sir M. Visvesvaraya – India’s Legendary Engineer and Visionary Builder", 
    category: "Engineering Legends", 
    date: "May 17, 2024", 
    image: visvesvarayaImage, 
    author: "Karrcholai Team", 
    excerpt: "Discover how Sir M. Visvesvaraya’s engineering vision continues to inspire modern residential construction, project management, and sustainable infrastructure development.", 
    gallery: [
      {
        type: 'html',
        content: `<h2 class="text-3xl font-bold mt-10 mb-6 text-[#1a1a1a]">Sir M. Visvesvaraya – The Engineering Visionary Behind Modern Infrastructure</h2>
<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Introduction</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">India’s development in engineering and infrastructure owes a great deal to visionary leaders who transformed ideas into reality. One such legendary personality is Sir M. Visvesvaraya, one of the greatest civil engineers and nation-builders in Indian history.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">For companies involved in residential construction, architecture, project management, and infrastructure development, his life remains a timeless source of inspiration. At Karrcholai, we believe that engineering is not just about constructing buildings — it is about creating lasting value for society, just as Sir Visvesvaraya did throughout his life.</p>

<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Who Was Sir M. Visvesvaraya?</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Sir Mokshagundam Visvesvaraya was born on September 15, 1861, in Karnataka, India. He was a brilliant civil engineer, statesman, and visionary planner who played a major role in shaping modern India’s infrastructure.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">His dedication, discipline, and engineering excellence earned him the highest respect across the nation. In recognition of his extraordinary contributions, he was awarded the Bharat Ratna, India’s highest civilian honor.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Today, Engineers’ Day in India is celebrated every year on September 15th in his honor.</p>`
      },
      { type: 'single', image: vis2 },
      {
        type: 'html',
        content: `<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Engineering Excellence That Changed India</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Sir Visvesvaraya contributed to several landmark engineering projects that improved water management, irrigation, and urban planning.</p>

<h4 class="text-xl font-medium mt-6 mb-3 text-[#1a1a1a]">Krishna Raja Sagara (KRS) Dam</h4>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">One of his most famous achievements was the Krishna Raja Sagara Dam in Karnataka. The project helped transform agriculture and water supply systems for thousands of people.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Modern construction companies and project consultants continue to learn from such infrastructure planning principles even today.</p>

<h4 class="text-xl font-medium mt-6 mb-3 text-[#1a1a1a]">Innovative Water Management</h4>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">He introduced advanced flood protection systems and automatic sluice gates for dams, showcasing how engineering innovation can solve real-world challenges.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">His approach reminds modern construction professionals that intelligent planning and sustainable engineering are essential for long-term success.</p>`
      },
      { type: 'double', images: [vis3, vis4] },
      {
        type: 'html',
        content: `<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Inspiration for Modern Construction Industry</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">The values followed by Sir Visvesvaraya closely align with the principles required in today’s residential and infrastructure construction industry.</p>

<h4 class="text-xl font-medium mt-6 mb-3 text-[#1a1a1a]">1. Quality Construction</h4>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">He strongly believed in precision and quality. In modern residential construction, maintaining structural quality and engineering standards is equally important.</p>

<h4 class="text-xl font-medium mt-6 mb-3 text-[#1a1a1a]">2. Proper Project Planning</h4>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Every successful project starts with detailed planning. From site analysis to project execution, proper management helps avoid delays and unnecessary costs.</p>

<h4 class="text-xl font-medium mt-6 mb-3 text-[#1a1a1a]">3. Sustainable Development</h4>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Sir Visvesvaraya promoted development that benefited society. Today, sustainable construction practices such as rainwater harvesting, energy-efficient homes, and eco-friendly materials follow the same philosophy.</p>

<h4 class="text-xl font-medium mt-6 mb-3 text-[#1a1a1a]">4. Discipline and Professionalism</h4>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">His disciplined lifestyle continues to inspire engineers, architects, and construction professionals across India.</p>

<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Relevance to Residential Construction Today</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Modern homeowners are looking for homes that combine:</p>
<ul class="list-disc pl-6 mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed space-y-2">
<li>Smart planning</li>
<li>Vastu principles</li>
<li>Functional design</li>
<li>Sustainability</li>
<li>Long-term durability</li>
</ul>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">These ideas reflect the engineering mindset promoted by Sir Visvesvaraya decades ago.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">At Karrcholai, we focus on delivering residential construction and project management solutions that prioritize quality, planning, innovation, and customer satisfaction.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">From modern house construction to vastu-based planning and landscape-focused design, today’s projects require the same engineering commitment and vision that Sir Visvesvaraya represented.</p>

<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Lessons Construction Professionals Can Learn</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Construction professionals and project consultants can learn several important lessons from Sir Visvesvaraya:</p>
<ul class="list-disc pl-6 mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed space-y-2">
<li>Always prioritize quality over shortcuts</li>
<li>Plan projects with long-term vision</li>
<li>Use engineering to improve people’s lives</li>
<li>Embrace innovation and modern technology</li>
<li>Maintain discipline and professional ethics</li>
</ul>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">These values are essential for creating successful residential and infrastructure projects.</p>

<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Legacy of a Nation Builder</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Sir M. Visvesvaraya was not just an engineer — he was a visionary who believed that infrastructure and development could transform society.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">His contributions continue to inspire:</p>
<ul class="list-disc pl-6 mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed space-y-2">
<li>Civil engineers</li>
<li>Architects</li>
<li>Builders</li>
<li>Project consultants</li>
<li>Construction companies</li>
<li>Engineering students</li>
</ul>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">Even today, his life stands as a symbol of dedication, innovation, and nation-building.</p>

<h3 class="text-2xl font-semibold mt-8 mb-4 text-[#1a1a1a]">Conclusion</h3>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">The legacy of Sir M. Visvesvaraya continues to influence modern engineering and construction practices across India.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">For the residential construction industry, his life teaches the importance of planning, quality, sustainability, and professionalism. His vision remains highly relevant in today’s world where modern homes require both technical excellence and thoughtful design.</p>
<p class="mb-4 text-lg text-[#1a1a1a]/80 leading-relaxed">At Karrcholai, we are inspired by such engineering legends and strive to bring the same commitment and quality into every residential construction project.</p>`
      }
    ]
  },

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
  "Engineering Legends",
  "Construction Tips",
  "Client Stories",
  "Rainwater Harvesting",
  "Solar Energy",
  "Sustainable Living"
];
