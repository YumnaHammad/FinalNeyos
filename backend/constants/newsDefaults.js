const IMG = {
  handshake:
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
  product:
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
  event:
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
  award:
    'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
  city:
    'https://images.pexels.com/photos/1486223/pexels-photo-1486223.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop',
};

module.exports = {
  productLines: ['Network Camera', 'LoRaWAN', 'IoT Cloud', 'Industrial Router', 'Software'],
  topics: ['Product Launch', 'Events', 'Partnership', 'Award', 'Company News'],
  posts: [
    {
      title: 'Nexyos Unveils Next-Generation AI Camera Series at ISC West 2025',
      slug: 'nexyos-ai-camera-isc-west-2025',
      excerpt:
        'New multi-sensor cameras deliver enhanced analytics, lower false alarms, and seamless VMS integration for enterprise deployments.',
      content:
        '<p>Nexyos announced its next-generation AI camera series at ISC West 2025, showcasing advanced edge analytics and improved low-light performance for security and smart city applications.</p>',
      image: IMG.product,
      year: 2025,
      productLine: 'Network Camera',
      topic: 'Product Launch',
      publishedAt: new Date('2025-03-15'),
      sortOrder: 1,
    },
    {
      title: 'Nexyos IoT Cloud Platform Reaches 1 Million Connected Devices',
      slug: 'nexyos-iot-cloud-1m-devices',
      excerpt:
        'Milestone highlights growing adoption of Nexyos LoRaWAN and cloud solutions across smart building and utility sectors.',
      content:
        '<p>Nexyos IoT Cloud has surpassed one million connected devices worldwide, reflecting strong partner and customer adoption across multiple verticals.</p>',
      image: IMG.city,
      year: 2025,
      productLine: 'IoT Cloud',
      topic: 'Company News',
      publishedAt: new Date('2025-01-20'),
      sortOrder: 2,
    },
    {
      title: 'Strategic Partnership Expands Nexyos Distribution in EMEA',
      slug: 'nexyos-emea-partnership-2024',
      excerpt:
        'New alliance strengthens channel coverage and local support for integrators across Europe, Middle East, and Africa.',
      content:
        '<p>Nexyos signed a strategic distribution partnership to accelerate IoT and video surveillance deployments across the EMEA region.</p>',
      image: IMG.handshake,
      year: 2024,
      productLine: 'LoRaWAN',
      topic: 'Partnership',
      publishedAt: new Date('2024-11-08'),
      sortOrder: 3,
    },
    {
      title: 'Nexyos Wins Innovation Award for Smart Building Solution',
      slug: 'nexyos-smart-building-award-2024',
      excerpt:
        'Recognition celebrates Nexyos occupancy and environmental sensing platform for commercial real estate.',
      content:
        '<p>The Nexyos smart building platform received an industry innovation award for its impact on energy efficiency and workspace optimization.</p>',
      image: IMG.award,
      year: 2024,
      productLine: 'IoT Cloud',
      topic: 'Award',
      publishedAt: new Date('2024-09-12'),
      sortOrder: 4,
    },
    {
      title: 'Nexyos Showcases Smart City Solutions at Gitex Global',
      slug: 'nexyos-gitex-global-2023',
      excerpt:
        'Live demos featured traffic management, smart parking, and environmental monitoring powered by Nexyos AIoT stack.',
      content:
        '<p>At Gitex Global, Nexyos demonstrated integrated smart city solutions combining video intelligence and LoRaWAN sensor networks.</p>',
      image: IMG.event,
      year: 2023,
      productLine: 'Network Camera',
      topic: 'Events',
      publishedAt: new Date('2023-10-18'),
      sortOrder: 5,
    },
    {
      title: 'Industrial Router Portfolio Updated for 5G Edge Connectivity',
      slug: 'nexyos-5g-router-update-2023',
      excerpt:
        'Enhanced failover, VPN, and remote management capabilities support critical infrastructure and remote sites.',
      content:
        '<p>Nexyos released a major firmware and hardware update to its industrial router line, adding improved 5G support and security features.</p>',
      image: IMG.product,
      year: 2023,
      productLine: 'Industrial Router',
      topic: 'Product Launch',
      publishedAt: new Date('2023-06-22'),
      sortOrder: 6,
    },
    {
      title: 'Nexyos Opens Regional Support Center in Doha',
      slug: 'nexyos-doha-support-center-2022',
      excerpt:
        'New facility provides pre-sales engineering, training, and project support for partners in the Gulf region.',
      content:
        '<p>Nexyos expanded its global footprint with a regional support center in Doha to better serve partners and customers in the Middle East.</p>',
      image: IMG.handshake,
      year: 2022,
      productLine: 'Software',
      topic: 'Company News',
      publishedAt: new Date('2022-08-30'),
      sortOrder: 7,
    },
    {
      title: 'LoRaWAN Gateway Line Achieves Key Certification Milestone',
      slug: 'nexyos-lorawan-certification-2021',
      excerpt:
        'Certification enables faster deployment for smart agriculture, utilities, and campus IoT projects worldwide.',
      content:
        '<p>Nexyos LoRaWAN gateways received updated certifications, simplifying deployment for system integrators globally.</p>',
      image: IMG.city,
      year: 2021,
      productLine: 'LoRaWAN',
      topic: 'Product Launch',
      publishedAt: new Date('2021-12-05'),
      sortOrder: 8,
    },
  ],
};
