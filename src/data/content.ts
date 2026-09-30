import { Project, ServiceItem, ProcessStep, PrincipleItem } from '../types';
import heSheSalonImg from '../assets/images/he_she_salon_1790094800198.jpg';
import sahejraoRealtorsImg from '../assets/images/sahejrao_realtors_1790094816724.jpg';
import krishnaMedicalImg from '../assets/images/krishna_medical_1790094835191.jpg';
import dnaInfotelImg from '../assets/images/dna_infotel_1790094856873.jpg';
import oneRepMaxImg from '../assets/images/one_rep_max_1790094872386.jpg';
import chamundaSareeImg from '../assets/images/chamunda_saree_1790094891607.jpg';

export const BRAND_LOGO_URL = '/core-web-studio-logo.png';

export const PROJECTS: Project[] = [
  {
    id: 'he-and-she-salon',
    number: '01',
    title: 'HE & SHE SALON',
    category: 'SALON & BEAUTY',
    industry: 'Beauty',
    year: '2025 RELEASE',
    description: 'A modern digital experience for a salon and beauty business, focused on services, presentation and easy customer contact.',
    longDescription: 'Engineered for seamless client discovery with bespoke appointment booking pathways, high-definition service menu layouts, and mobile-first speed optimization to convert local footfall into loyal clientele.',
    imageUrl: heSheSalonImg,
    altText: 'Chic modern hair and beauty salon interior with minimalist styling, illuminated brass mirrors, sleek ergonomic styling chairs, and ambient warm daylight evoking luxury self-care in a refined contemporary studio.',
    liveUrl: 'https://heandshesalon.in/',
    fallbackUrl: 'https://heandshesalonwebsite.netlify.app',
    tags: ['Service Menu', 'Booking Flow', 'Mobile Responsive'],
    gridSpan: 'col-span-1',
    highlights: ['Fast load time under 0.8s', 'Direct WhatsApp & Call triggers', 'Interactive Treatment Catalog'],
    deliverables: ['Brand UI Kit', 'Responsive Web App', 'SEO Metadata', 'Google Maps Integration']
  },
  {
    id: 'sahejrao-realtors',
    number: '02',
    title: 'SAHEJRAO REALTORS',
    category: 'REAL ESTATE',
    industry: 'Real Estate',
    year: '2025 RELEASE',
    description: 'A professional real-estate website designed to present properties clearly and create a stronger digital presence for the business.',
    longDescription: 'A high-impact architectural showcase featuring ultra-crisp visual property listings, immersive floor plan galleries, and filtered query modules for prospective home buyers and investors.',
    imageUrl: sahejraoRealtorsImg,
    altText: 'Architectural luxury real estate villa with floor-to-ceiling glass walls overlooking a tranquil infinity pool, dusk lighting, minimalist concrete terraces, and manicured landscaping in a high-end coastal setting.',
    liveUrl: 'https://sahejraorealtors.com/',
    fallbackUrl: 'https://sahejraorealtors.netlify.app',
    tags: ['Property Showcase', 'Lead Capture', 'Architectural Gallery'],
    gridSpan: 'col-span-1',
    highlights: ['High-resolution imagery pipeline', 'Neighborhood guide integration', 'Instant inquiry drawer'],
    deliverables: ['Design System', 'Listing CMS Wireframes', 'Client Onboarding Portal']
  },
  {
    id: 'krishna-medical-stores',
    number: '03',
    title: 'KRISHNA MEDICAL STORES',
    category: 'HEALTHCARE & PHARMACY',
    industry: 'Healthcare',
    year: '2025 RELEASE',
    description: 'A clean business website concept for a local medical store, focused on clarity, information and customer accessibility.',
    longDescription: 'Purpose-built with accessible high-contrast typography, digital prescription upload guidelines, operating hours, emergency hotline triggers, and local community trust-building metrics.',
    imageUrl: krishnaMedicalImg,
    altText: 'Clean clinical modern pharmacy interior with pristine white shelves, organized wellness and healthcare products, soft blue medical ambient LED lighting, and polished modern counters reflecting trust and hygiene.',
    liveUrl: 'https://krishnamedicalstores.com/',
    fallbackUrl: 'https://krishnamedicalwebsite.netlify.app',
    tags: ['Prescription Upload', 'Store Hours', 'Local SEO'],
    gridSpan: 'col-span-1',
    highlights: ['WCAG AA accessible contrast', 'Tap-to-call emergency quick bar', 'Prescription upload form'],
    deliverables: ['User Experience Audit', 'Responsive Web Experience', 'Local Search Setup']
  },
  {
    id: 'dna-infotel',
    number: '04',
    title: 'DNA INFOTEL',
    category: 'INTERNET & BROADBAND',
    industry: 'Technology',
    year: '2026 RELEASE',
    description: 'A modern digital presence for an internet service provider, designed to communicate services clearly and make customer enquiries easier.',
    longDescription: 'Engineered for telecom reliability featuring high-speed broadband plan matrices, interactive coverage search, self-service request portals, and clean enterprise authority styling.',
    imageUrl: dnaInfotelImg,
    altText: 'High speed fiber optic network cables glowing with electric cobalt blue light pulses traversing a modern data center rack, clean tech aesthetic representing robust telecom infrastructure and broadband speed.',
    liveUrl: 'https://dnainfotel.com/',
    fallbackUrl: 'https://dna-infotel-demo.netlify.app',
    tags: ['Broadband Plans', 'Speed Verification', 'Customer Portal'],
    gridSpan: 'col-span-1',
    highlights: ['Interactive Plan Comparison', 'Customer Signup Funnel', 'Modern Tech Polish'],
    deliverables: ['Digital Flagship Site', 'Dynamic Plan Grid', 'Technical Documentation']
  },
  {
    id: 'one-rep-max',
    number: '05',
    title: 'ONE REP MAX',
    category: 'FITNESS & GYM',
    industry: 'Fitness',
    year: '2026 RELEASE',
    description: 'A bold fitness website concept focused on strength, facilities, member experience and clear calls to action.',
    longDescription: 'High-octane athletics interface packed with gritty typography, gym facility previews, trainer profiles, group training class schedules, and streamlined membership enrollment.',
    imageUrl: oneRepMaxImg,
    altText: 'High performance gym facility with matte black dumbbells, heavy squat racks, moody dramatic directional spotlights, and high intensity athletic training environment conveying power, grit and motivation.',
    liveUrl: 'https://onerepmax.co.in/',
    fallbackUrl: 'https://onerepmaxxx.netlify.app',
    tags: ['Athletic Branding', 'Membership Signups', 'Facilities Tour'],
    gridSpan: 'col-span-1',
    highlights: ['Bold athletic aesthetic', 'Free trial session pass generator', 'Class timetable breakdown'],
    deliverables: ['Custom Brand Identity', 'Fitness Web Platform', 'Social Media Assets']
  },
  {
    id: 'chamunda-saree-nx',
    number: '06',
    title: 'CHAMUNDA SAREE NX',
    category: 'FASHION & RETAIL',
    industry: 'Fashion',
    year: '2026 RELEASE',
    description: 'A fashion-focused website concept designed to showcase saree collections through a modern visual storefront and easy customer enquiry flow.',
    longDescription: 'Bridal and ethnic wear digital storefront that combines rich tactile textile photography, collection filtering by fabric and occasion, and immediate WhatsApp order routing.',
    imageUrl: chamundaSareeImg,
    altText: 'Luxurious hand-woven silk royal saree with delicate metallic gold zari embroidery patterns draping elegantly in soft gallery lighting inside a high fashion bridal boutique showroom.',
    liveUrl: 'https://chamundasareenx.com/',
    fallbackUrl: 'https://chamundasaree.netlify.app',
    tags: ['Lookbook Showcase', 'WhatsApp Ordering', 'Collection Filters'],
    gridSpan: 'col-span-1',
    highlights: ['Textile detail galleries', 'One-click WhatsApp purchase link', 'Seasonal bridal curations'],
    deliverables: ['Lookbook Design', 'E-commerce Readiness', 'Optimized Image Pipeline']
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-design',
    number: '01',
    title: 'WEBSITES',
    description: 'Modern websites made around your business.',
    subtags: ['Creative Direction', 'Custom UI/UX', 'Mobile-First', 'Fast Loading']
  },
  {
    id: 'web-development',
    number: '02',
    title: 'REDESIGN',
    description: 'A fresh look for an outdated website.',
    subtags: ['Speed Boost', 'Modern Aesthetics', 'Better Mobile Flow', 'Higher Conversion']
  },
  {
    id: 'business-websites',
    number: '03',
    title: 'LANDING PAGES',
    description: 'Focused pages built to turn visitors into enquiries.',
    subtags: ['Ad Traffic', 'Lead Generation', 'Fast Conversions', 'Action-Oriented']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCUSS',
    subtitle: 'Discovery & Brief',
    description: 'We understand your business, goals and what you need.'
  },
  {
    number: '02',
    title: 'PLAN',
    subtitle: 'Structure & Identity',
    description: 'We choose the right digital solution for your business.'
  },
  {
    number: '03',
    title: 'BUILD',
    subtitle: 'Clean Engineering',
    description: 'We design, develop and set everything up for you.'
  },
  {
    number: '04',
    title: 'LAUNCH',
    subtitle: 'Go Live & Handover',
    description: 'We put everything together and help you get it working.'
  }
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    number: '01',
    title: 'WEBSITES THAT WORK',
    description: 'Modern websites designed around your business, your customers and your goals.'
  },
  {
    number: '02',
    title: 'SMARTER AUTOMATION',
    description: 'WhatsApp automation and digital systems that make enquiries and repetitive work easier.'
  },
  {
    number: '03',
    title: 'GET FOUND ONLINE',
    description: 'SEO and Google visibility strategies that help more people discover your business.'
  },
  {
    number: '04',
    title: 'TURN ATTENTION INTO LEADS',
    description: 'Better digital systems that help potential customers find you, contact you and take action.'
  }
];
