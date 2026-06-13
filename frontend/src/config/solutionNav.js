/** Central config for Solutions navbar + landing page links */
export const solutionNavGroups = [
  {
    id: 'security',
    title: 'Security & Surveillance',
    items: [
      {
        label: 'Video Surveillance',
        path: '/solution/videoSurveillance',
        desc: 'AI-powered CCTV & analytics',
        heroImage:
          'https://www.milesight.com/static/pc/en/page/technology/solution/ptz-series/banner.jpg?t=1754966591917',
      },
      {
        label: 'City Surveillance',
        path: '/solution/citySurveillance',
        desc: 'Urban safety at scale',
        heroImage:
          'https://pelco-891395695.imgix.net/fresno-airport-image-850x638.jpg?auto=format&fit=clip&q=80&w=1600',
      },
      {
        label: 'Healthcare',
        path: '/solution/healthcare',
        desc: 'Hospital & clinic security',
        heroImage:
          'https://www.milesight.com/static/pc/en/solution/health-care/healthcare-banner.jpg',
      },
      {
        label: 'Hotel',
        path: '/solution/hotel',
        desc: 'Hospitality protection',
        heroImage:
          'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Retail Security',
        path: '/solution/retailSecurity',
        desc: 'Loss prevention & insights',
        heroImage:
          'https://www.milesight.com/static/pc/en/solution/smart-retail/retail-banner.jpg',
      },
    ],
  },
  {
    id: 'smart',
    title: 'Smart Buildings',
    items: [
      {
        label: 'Smart Restroom',
        path: '/solution/smartRestroom',
        desc: 'Hygiene & occupancy monitoring',
        heroImage:
          'https://www.milesight.com/static/pc/en/solution/smart-restroom/smart-restroom-banner.jpg',
      },
      {
        label: 'Smart Space',
        path: '/solution/smartSpace',
        desc: 'Flexible workspace intelligence',
        heroImage:
          'https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/space-occupancy-banner-background.jpg?t=1752224588823',
      },
      {
        label: 'Smart Apartment',
        path: '/solution/smartAppartment',
        desc: 'Residential access & safety',
        heroImage:
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Display & Control',
        path: '/solution/displayControl',
        desc: 'Centralized AV management',
        heroImage:
          'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Smart Parking',
        path: '/solution/smartParking',
        desc: 'Guidance & LPR parking',
        heroImage:
          'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/parking-management.jpg?t=1751621798627',
      },
      {
        label: 'Indoor Air Quality',
        path: '/solution/IndoorAirQuality',
        desc: 'Healthy environments',
        heroImage:
          'https://images.pexels.com/photos/4792492/pexels-photo-4792492.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Energy Efficiency',
        path: '/solution/EnergyEfficiency',
        desc: 'Smart energy management',
        heroImage:
          'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
  },
  {
    id: 'mobility',
    title: 'Mobility & Operations',
    items: [
      {
        label: 'Intelligent Traffic',
        path: '/solution/IntelligentTrafficSolution',
        desc: 'ANPR & road safety',
        heroImage:
          'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/road-traffic-management.jpg?t=1751621798627',
      },
      {
        label: 'Manufacturing',
        path: '/solution/Manufacturing',
        desc: 'Plant safety & efficiency',
        heroImage:
          'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Education',
        path: '/solution/Education',
        desc: 'Campus security & safety',
        heroImage:
          'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
  },
];

export const solutionStickyTabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'industry', label: 'By Industry' },
  { id: 'scenario', label: 'By Scenario' },
  { id: 'function', label: 'By Function' },
];

export const allSolutionLinks = solutionNavGroups.flatMap((g) => g.items);
