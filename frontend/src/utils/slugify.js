export const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const categoryPath = (item) => {
  const slug = item?.slug || slugify(item?.category || item?.name);
  return `/category/${slug}`;
};

/** Dedicated product list for a sub-sub category (e.g. dome-cameras) */
export const familyPath = (categorySlug, subCategorySlug, subSubSlug) =>
  `/category/${categorySlug}/${subCategorySlug}/${subSubSlug}`;
