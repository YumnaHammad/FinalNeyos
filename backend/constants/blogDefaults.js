const IMG = {
  traffic:
    'https://images.pexels.com/photos/374631/pexels-photo-374631.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  building:
    'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  iot: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  camera:
    'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  agriculture:
    'https://images.pexels.com/photos/162524/pexels-photo-162524.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  campaign:
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
};

module.exports = {
  categories: [
    { name: 'Product', slug: 'product', sortOrder: 1 },
    { name: 'Solutions', slug: 'solutions', sortOrder: 2 },
    { name: 'Innovation', slug: 'innovation', sortOrder: 3 },
    { name: 'Campaign', slug: 'campaign', sortOrder: 4 },
  ],
  posts: [
    {
      title:
        'Cracking the Congestion Code: Why Precision ANPR is Critical to the Cities of Tomorrow',
      slug: 'precision-anpr-smart-cities',
      excerpt:
        'Urban congestion is a growing challenge. High-accuracy ANPR helps cities optimize traffic flow, enforce zones, and plan smarter mobility.',
      content: `<p>Urban congestion is a growing challenge for cities worldwide. As populations increase and more vehicles hit the roads, traditional traffic management systems are struggling to keep up.</p>
<h3>How Precision ANPR Makes a Difference</h3>
<ul><li>Real-time vehicle identification with high accuracy</li><li>Detailed traffic pattern analysis</li><li>Automated enforcement of congestion zones</li><li>Integration with smart city infrastructure</li></ul>
<p>Nexyos ANPR solutions help cities build smarter, more efficient transportation networks.</p>`,
      image: IMG.traffic,
      categories: ['Solutions'],
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    },
    {
      title: 'LoRaWAN Gateways: The Backbone of Scalable IoT Deployments',
      slug: 'lorawan-gateways-scalable-iot',
      excerpt:
        'Learn how enterprise-grade gateways connect thousands of sensors with reliable coverage and simplified management.',
      content: `<p>LoRaWAN gateways are essential for connecting battery-powered sensors across campuses, cities, and industrial sites.</p>
<p>Nexyos gateways support multi-channel reception, remote provisioning, and seamless cloud integration.</p>`,
      image: IMG.iot,
      categories: ['Product', 'Innovation'],
      isFeatured: false,
      isPublished: true,
      sortOrder: 2,
    },
    {
      title: 'Smart Building Occupancy: Data That Drives Better Decisions',
      slug: 'smart-building-occupancy-analytics',
      excerpt:
        'Space utilization, air quality, and people counting sensors turn buildings into responsive, efficient environments.',
      content: `<p>Modern workplaces need accurate occupancy and environmental data to reduce energy use and improve comfort.</p>
<p>Nexyos smart building solutions combine sensors, dashboards, and automation in one platform.</p>`,
      image: IMG.building,
      categories: ['Solutions'],
      isFeatured: false,
      isPublished: true,
      sortOrder: 3,
    },
    {
      title: 'AI Video Analytics: From Detection to Actionable Insight',
      slug: 'ai-video-analytics-actionable-insight',
      excerpt:
        'Explore how AI-powered cameras detect events, classify objects, and trigger automated responses in real time.',
      content: `<p>AI video analytics transforms surveillance from passive recording to proactive intelligence.</p>
<p>Deploy edge AI with Nexyos cameras and VMS integrations for retail, traffic, and perimeter use cases.</p>`,
      image: IMG.camera,
      categories: ['Product', 'Innovation'],
      isFeatured: false,
      isPublished: true,
      sortOrder: 4,
    },
    {
      title: 'Smart Agriculture: Sensing Soil, Water, and Crop Health Remotely',
      slug: 'smart-agriculture-remote-sensing',
      excerpt:
        'IoT sensors help farmers monitor conditions across fields and reduce waste with data-driven irrigation.',
      content: `<p>Agriculture IoT enables precision farming with soil moisture, weather, and asset tracking sensors.</p>
<p>Nexyos LoRaWAN devices operate for years on battery power in harsh outdoor environments.</p>`,
      image: IMG.agriculture,
      categories: ['Solutions', 'Innovation'],
      isFeatured: false,
      isPublished: true,
      sortOrder: 5,
    },
    {
      title: 'Nexyos Partner Campaign: Build the Connected World Together',
      slug: 'nexyos-partner-campaign-2025',
      excerpt:
        'Join our global partner network for co-marketing, technical enablement, and project registration support.',
      content: `<p>Our partner program supports integrators, distributors, and technology allies worldwide.</p>
<p>Register today for portal access, demo environments, and regional sales support.</p>`,
      image: IMG.campaign,
      categories: ['Campaign'],
      isFeatured: false,
      isPublished: true,
      sortOrder: 6,
    },
  ],
};
