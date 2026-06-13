const IMG = {
  partner:
    'https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309',
  cctv: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
  tech: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
  dev: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
  iot: 'https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/milesight-building.jpg',
  innovation:
    'https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703',
  ai: 'https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309',
  heat: 'https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309',
  sensor:
    'https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309',
};

export const CHANNEL_PARTNERS = [
  {
    id: 1,
    name: 'DeepTech Security Pte Ltd',
    country: 'Singapore',
    region: 'Asia Pacific',
    focus: ['CCTV', 'IoT'],
    email: 'contact@deeptech.sg',
    phone: '+65 6123 4567',
  },
  {
    id: 2,
    name: 'EuroVision Systems',
    country: 'Germany',
    region: 'Europe',
    focus: ['CCTV'],
    email: 'info@eurovision.de',
    phone: '+49 30 1234 5678',
  },
  {
    id: 3,
    name: 'SmartSense Americas',
    country: 'United States',
    region: 'North America',
    focus: ['IoT'],
    email: 'sales@smartsense.us',
    phone: '+1 800 555 0199',
  },
  {
    id: 4,
    name: 'Gulf Integrated Solutions',
    country: 'UAE',
    region: 'Middle East',
    focus: ['CCTV', 'IoT'],
    email: 'hello@gulfis.ae',
    phone: '+971 4 123 4567',
  },
  {
    id: 5,
    name: 'Pacific IoT Group',
    country: 'Australia',
    region: 'Asia Pacific',
    focus: ['IoT'],
    email: 'partners@pacificiot.com.au',
    phone: '+61 2 9876 5432',
  },
  {
    id: 6,
    name: 'SecureLink India',
    country: 'India',
    region: 'Asia Pacific',
    focus: ['CCTV'],
    email: 'support@securelink.in',
    phone: '+91 800 800 8841',
  },
  {
    id: 7,
    name: 'Nordic Vision AB',
    country: 'Sweden',
    region: 'Europe',
    focus: ['CCTV', 'IoT'],
    email: 'info@nordicvision.se',
    phone: '+46 8 123 4567',
  },
  {
    id: 8,
    name: 'LatAm Smart Cities',
    country: 'Brazil',
    region: 'Latin America',
    focus: ['IoT'],
    email: 'contato@latamsmart.com.br',
    phone: '+55 11 3456 7890',
  },
];

export const FIND_CHANNEL_STATS = [
  { value: '1200+', label: 'Partners' },
  { value: '92+', label: 'Countries' },
  { value: '24/7', label: 'Support' },
];

export const CCTV_CONTENT = {
  highlight: {
    image: IMG.cctv,
    badge: 'Security Zone',
    heading: 'Enterprise Video Surveillance Partnership',
    description:
      'Join the Nexyos CCTV channel program to deliver AI-powered cameras, NVRs, and analytics with dedicated sales, marketing, and technical support.',
    stats: [
      { value: '200+', label: 'Camera models' },
      { value: '92+', label: 'Countries' },
      { value: '500+', label: 'Partners' },
    ],
  },
  why: {
    heading: 'Why choose Nexyos for CCTV?',
    subHeadings: [
      'AI edge analytics with lower false alarms and faster response',
      'Full portfolio from cameras to NVRs, VMS, and cloud services',
      'Project registration and protected margins for qualified deals',
    ],
    image: IMG.innovation,
  },
  solutions: [
    { id: 1, heading: 'AI IP Cameras', description: 'Multi-sensor and PTZ cameras with on-board analytics.', image: IMG.ai },
    { id: 2, heading: 'NVR & Storage', description: 'Enterprise recording with RAID and remote management.', image: IMG.sensor },
    { id: 3, heading: 'Video Analytics', description: 'People counting, LPR, intrusion, and heat mapping.', image: IMG.heat },
    { id: 4, heading: 'Cloud VMS', description: 'Centralized monitoring and mobile access at scale.', image: IMG.ai },
  ],
  benefits: [
    { id: 1, heading: 'Sales training', description: 'Product certifications and demo kits for your team.', image: IMG.ai },
    { id: 2, heading: 'Marketing co-op', description: 'Co-branded campaigns, event support, and lead sharing.', image: IMG.heat },
    { id: 3, heading: 'Technical pre-sales', description: 'Solution design, PoC support, and deployment guidance.', image: IMG.sensor },
    { id: 4, heading: 'Protected pricing', description: 'Project registration with competitive deal protection.', image: IMG.ai },
  ],
};

export const TECHNOLOGY_CONTENT = {
  highlight: {
    image: IMG.tech,
    badge: 'Tech Innovation Hub',
    heading: 'Co-Innovate with Nexyos',
    description:
      'Technology partners integrate Nexyos hardware and APIs with cloud, AI, and vertical platforms to deliver next-generation solutions.',
    stats: [
      { value: '50+', label: 'Integrations' },
      { value: '40+', label: 'Countries' },
      { value: '100+', label: 'Tech allies' },
    ],
  },
  why: {
    heading: 'Why partner on technology?',
    subHeadings: [
      'Open APIs and SDKs for video, IoT, and cloud connectivity',
      'Joint go-to-market with co-branded solution bundles',
      'Dedicated partner engineering and sandbox environments',
    ],
    image: IMG.innovation,
  },
  solutions: [
    { id: 1, heading: 'Cloud Integration', description: 'Connect Nexyos devices to AWS, Azure, and custom clouds.', image: IMG.tech },
    { id: 2, heading: 'AI & Analytics', description: 'Embed computer vision and ML pipelines at the edge.', image: IMG.ai },
    { id: 3, heading: 'IoT Platforms', description: 'LoRaWAN and MQTT integrations for smart environments.', image: IMG.sensor },
    { id: 4, heading: 'VMS & PSIM', description: 'Certified integrations with leading management software.', image: IMG.heat },
  ],
  benefits: [
    { id: 1, heading: 'Solution lab access', description: 'Test integrations in a dedicated partner sandbox.', image: IMG.tech },
    { id: 2, heading: 'Co-marketing', description: 'Joint webinars, case studies, and event presence.', image: IMG.ai },
    { id: 3, heading: 'Priority engineering', description: 'Direct access to Nexyos R&D for roadmap alignment.', image: IMG.sensor },
    { id: 4, heading: 'Referral pipeline', description: 'Qualified leads routed to certified technology partners.', image: IMG.heat },
  ],
};

export const DEVELOPER_CONTENT = {
  program: {
    image: IMG.dev,
    badge: 'Developer Zone',
    heading: 'Build on the Nexyos Platform',
    description:
      'Developer partners get APIs, SDKs, documentation, and sandbox access to create applications on Nexyos video and IoT devices.',
    stats: [
      { value: '30+', label: 'APIs' },
      { value: '12', label: 'SDKs' },
      { value: '24/7', label: 'Dev support' },
    ],
  },
  why: {
    heading: 'Why become a developer partner?',
    subHeadings: [
      'RESTful APIs and SDKs for video, events, and device management',
      'Sample code, sandbox devices, and certification pathways',
      'Marketplace listing and co-selling for certified applications',
    ],
    image: IMG.dev,
  },
  solutions: [
    { id: 1, heading: 'Device API', description: 'Configure cameras, sensors, and gateways programmatically.', image: IMG.dev },
    { id: 2, heading: 'Event Webhooks', description: 'Stream alerts and analytics to your applications in real time.', image: IMG.ai },
    { id: 3, heading: 'Mobile SDK', description: 'Build iOS and Android apps with live view and playback.', image: IMG.sensor },
    { id: 4, heading: 'IoT SDK', description: 'Integrate LoRaWAN payloads and cloud rules engines.', image: IMG.heat },
  ],
  benefits: [
    { id: 1, heading: 'Free sandbox tier', description: 'Test against virtual and physical lab devices.', image: IMG.dev },
    { id: 2, heading: 'Documentation hub', description: 'Guides, OpenAPI specs, and sample projects.', image: IMG.ai },
    { id: 3, heading: 'Certification badge', description: 'Listed as a Nexyos certified application partner.', image: IMG.sensor },
    { id: 4, heading: 'Developer forum', description: 'Community support and direct engineer office hours.', image: IMG.heat },
  ],
};

export const BECOME_PARTNER_WHY = {
  heading: 'Why Partner with Nexyos?',
  subHeadings: [
    'Global portfolio spanning AI video, LoRaWAN sensors, and cloud platforms',
    'Dedicated partner managers, training, and marketing resources',
    'Flexible programs for resellers, integrators, developers, and technology allies',
  ],
  image: IMG.innovation,
};

export const PARTNER_TYPES = [
  {
    title: 'Channel Partner',
    description: 'Resell and deploy Nexyos products with sales and marketing support.',
    path: '/Partner/ChannelPartner',
  },
  {
    title: 'Technology Partner',
    description: 'Integrate Nexyos with your platform, cloud, or software stack.',
    path: '/Partner/TechnologyPartner',
  },
  {
    title: 'Developer Partner',
    description: 'Build apps using Nexyos APIs, SDKs, and developer resources.',
    path: '/Partner/DeveloperPartner',
  },
  {
    title: 'CCTV Partner',
    description: 'Focus on video surveillance projects with specialized program benefits.',
    path: '/Partner/CCTVChannel',
  },
];
