module.exports = [
  {
    name: 'Network Products',
    slug: 'network-products',
    description: 'IP cameras, NVRs, switches and network video solutions.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    sortOrder: 1,
    subCategories: [
      {
        name: 'IP Cameras',
        slug: 'ip-cameras',
        subSubCategories: [
          { name: 'Dome Cameras', slug: 'dome-cameras' },
          { name: 'Bullet Cameras', slug: 'bullet-cameras' },
        ],
      },
      {
        name: 'NVR & Storage',
        slug: 'nvr-storage',
        subSubCategories: [{ name: 'Enterprise NVR', slug: 'enterprise-nvr' }],
      },
    ],
  },
  {
    name: 'Access Control & Time Attendance',
    slug: 'access-control',
    description: 'Secure entry systems and workforce attendance solutions.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    sortOrder: 2,
    subCategories: [
      {
        name: 'Card Readers',
        slug: 'card-readers',
        subSubCategories: [{ name: 'RFID Readers', slug: 'rfid-readers' }],
      },
      {
        name: 'Biometric Devices',
        slug: 'biometric-devices',
        subSubCategories: [{ name: 'Face Recognition', slug: 'face-recognition' }],
      },
    ],
  },
  {
    name: 'Audio/Video Intercom Systems',
    slug: 'intercom-systems',
    description: 'Two-way audio and video communication for buildings.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    sortOrder: 3,
    subCategories: [
      {
        name: 'Door Stations',
        slug: 'door-stations',
        subSubCategories: [{ name: 'Video Door Phones', slug: 'video-door-phones' }],
      },
    ],
  },
  {
    name: 'Display and Control',
    slug: 'display-control',
    description: 'Video walls, controllers and monitoring displays.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    sortOrder: 4,
    subCategories: [
      {
        name: 'Control Panels',
        slug: 'control-panels',
        subSubCategories: [{ name: 'Touch Panels', slug: 'touch-panels' }],
      },
    ],
  },
  {
    name: 'Smart Lighting',
    slug: 'smart-lighting',
    description: 'Intelligent lighting controls and sensors.',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600',
    sortOrder: 5,
    subCategories: [
      {
        name: 'LED Fixtures',
        slug: 'led-fixtures',
        subSubCategories: [
          { name: 'Indoor Panels', slug: 'indoor-panels' },
          { name: 'Outdoor Flood', slug: 'outdoor-flood' },
        ],
      },
      {
        name: 'Smart Bulbs',
        slug: 'smart-bulbs',
        subSubCategories: [{ name: 'Wi-Fi Bulbs', slug: 'wifi-bulbs' }],
      },
    ],
  },
  {
    name: 'IoT Sensors',
    slug: 'iot-sensors',
    description: 'Environmental and occupancy sensing devices.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    sortOrder: 6,
    subCategories: [
      {
        name: 'People Counting',
        slug: 'people-counting',
        subSubCategories: [{ name: 'Overhead Sensors', slug: 'overhead-sensors' }],
      },
    ],
  },
  {
    name: 'Traffic Solutions',
    slug: 'traffic-solutions',
    description: 'Road monitoring and intelligent traffic management.',
    image: 'https://www.milesight.com/static/pc/en/security/solution/traffic-monitoring-cameras/banner.jpg?t=1752224475592',
    sortOrder: 7,
    subCategories: [],
  },
  {
    name: 'Software & Platform',
    slug: 'software-platform',
    description: 'VMS, analytics and cloud management platforms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    sortOrder: 8,
    subCategories: [],
  },
];
