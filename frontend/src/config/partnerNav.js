export const partnerNavGroups = [
  {
    id: 'ecosystem',
    title: 'Nexyos Partner Ecosystem',
    items: [
      {
        label: 'Find a Channel Partner',
        path: '/Partner/FindChannel',
        desc: 'Locate authorized Nexyos resellers and integrators near you.',
        heroImage:
          'https://www.milesight.com/static/pc/en/partner/find-channel-partner/cp-list-channel-partners-pc-first-pic.png',
      },
      {
        label: 'Channel Partner Program',
        path: '/Partner/ChannelPartner',
        desc: 'Grow your business with sales, marketing, and technical support.',
        heroImage:
          'https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309',
      },
      {
        label: 'Project Registration',
        path: '/Partner/ProjectRegistration',
        desc: 'Register opportunities for dedicated project support and pricing.',
        heroImage:
          'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'IoT Collaboration Start Guide',
        path: '/Partner/IotCollaboration',
        desc: 'Start building IoT solutions with Nexyos sensors and platforms.',
        heroImage:
          'https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/milesight-building.jpg',
      },
    ],
  },
  {
    id: 'programs',
    title: 'Partner Programs',
    items: [
      {
        label: 'Nexyos Developer Partner',
        path: '/Partner/DeveloperPartner',
        desc: 'APIs, SDKs, and tools to build on the Nexyos ecosystem.',
        heroImage:
          'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Technology Partner Program',
        path: '/Partner/TechnologyPartner',
        desc: 'Co-innovate with Nexyos across AI, IoT, cloud, and edge.',
        heroImage:
          'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'CCTV Channel Partner',
        path: '/Partner/CCTVChannel',
        desc: 'Deliver enterprise video surveillance with Nexyos portfolio.',
        heroImage:
          'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        label: 'Become a Partner',
        path: '/Partner/BecomePartner',
        desc: 'Apply to join the Nexyos global partner network.',
        heroImage:
          'https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703',
      },
    ],
  },
];

export const allPartnerLinks = partnerNavGroups.flatMap((g) => g.items);

export function getPartnerMeta(pathname = '') {
  const normalized = pathname.toLowerCase().replace(/\/$/, '');
  const item = allPartnerLinks.find((l) => l.path.toLowerCase() === normalized);
  if (!item) {
    return {
      label: 'Partner',
      desc: '',
      heroImage: '',
      groupTitle: 'Partners',
      path: pathname,
    };
  }
  const group = partnerNavGroups.find((g) =>
    g.items.some((i) => i.path.toLowerCase() === item.path.toLowerCase())
  );
  return {
    ...item,
    groupTitle: group?.title || 'Partners',
    groupId: group?.id || '',
  };
}
