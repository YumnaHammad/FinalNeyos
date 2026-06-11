// Scoped search filters — each group belongs to one sub-sub category (product family)
const network = {
  categorySlug: 'network-products',
  subCategorySlug: 'ip-cameras',
};

module.exports = [
  {
    ...network,
    subSubCategorySlug: 'dome-cameras',
    attribute: 'Subseries',
    slug: 'dome-subseries',
    sortOrder: 1,
    items: [
      { item: 'Pro Series', sortOrder: 1 },
      { item: 'EasyIP 3.0', sortOrder: 2 },
      { item: 'EasyIP 4.0 with ColorVu', sortOrder: 3 },
    ],
  },
  {
    ...network,
    subSubCategorySlug: 'dome-cameras',
    attribute: 'Resolution',
    slug: 'dome-resolution',
    sortOrder: 2,
    items: [
      { item: '4MP', sortOrder: 1 },
      { item: '6MP', sortOrder: 2 },
    ],
  },
  {
    ...network,
    subSubCategorySlug: 'dome-cameras',
    attribute: 'Case Type',
    slug: 'dome-case-type',
    sortOrder: 3,
    items: [{ item: 'Dome', sortOrder: 1 }],
  },
  {
    ...network,
    subSubCategorySlug: 'bullet-cameras',
    attribute: 'Subseries',
    slug: 'bullet-subseries',
    sortOrder: 1,
    items: [
      { item: 'Pro Series', sortOrder: 1 },
      { item: 'EasyIP 3.0', sortOrder: 2 },
      { item: 'Ultra Series', sortOrder: 3 },
    ],
  },
  {
    ...network,
    subSubCategorySlug: 'bullet-cameras',
    attribute: 'Resolution',
    slug: 'bullet-resolution',
    sortOrder: 2,
    items: [
      { item: '4MP', sortOrder: 1 },
      { item: '8MP', sortOrder: 2 },
    ],
  },
  {
    ...network,
    subSubCategorySlug: 'bullet-cameras',
    attribute: 'Case Type',
    slug: 'bullet-case-type',
    sortOrder: 3,
    items: [{ item: 'Bullet', sortOrder: 1 }],
  },
];
