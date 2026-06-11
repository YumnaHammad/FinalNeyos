const FilterConfig = require('../models/FilterConfig');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toLegacyShape = (groups) =>
  groups.map((g, idx) => ({
    id: g._id || idx + 1,
    attribute: g.attribute,
    items: (g.items || []).map((item, i) => ({
      id: item._id || i + 1,
      item: item.item,
    })),
  }));

exports.listFilters = async (req, res) => {
  try {
    const { categorySlug, subCategorySlug, subSubCategorySlug } = req.query;
    const filter = { isActive: { $ne: false } };

    if (subSubCategorySlug) {
      filter.subSubCategorySlug = subSubCategorySlug;
      if (categorySlug) filter.categorySlug = categorySlug;
      if (subCategorySlug) filter.subCategorySlug = subCategorySlug;
    } else if (categorySlug) {
      filter.categorySlug = categorySlug;
    }

    let groups = await FilterConfig.find(filter).sort({
      sortOrder: 1,
      attribute: 1,
    });

    if (subSubCategorySlug && groups.length === 0) {
      groups = await FilterConfig.find({
        isActive: { $ne: false },
        subSubCategorySlug: '',
      }).sort({ sortOrder: 1, attribute: 1 });
    }

    if (req.query.legacy === '1') {
      return res.json(toLegacyShape(groups));
    }

    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFilter = async (req, res) => {
  try {
    const group = await FilterConfig.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Filter group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFilter = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.attribute) data.slug = slugify(data.attribute);
    const group = await FilterConfig.create(data);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateFilter = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.attribute && !data.slug) data.slug = slugify(data.attribute);
    const group = await FilterConfig.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!group) return res.status(404).json({ message: 'Filter group not found' });
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFilter = async (req, res) => {
  try {
    const group = await FilterConfig.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: 'Filter group not found' });
    res.json({ message: 'Filter group deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const syncFilterIndexes = async () => {
  try {
    await FilterConfig.collection.dropIndex('attribute_1');
  } catch {
    /* legacy index may not exist */
  }
  await FilterConfig.syncIndexes();
};

exports.seedDefaults = async (_req, res) => {
  try {
    await syncFilterIndexes();
    const defaults = require('../constants/filterDefaults');
    for (const item of defaults) {
      const slug = item.slug || slugify(item.attribute);
      const scope = {
        categorySlug: item.categorySlug || '',
        subCategorySlug: item.subCategorySlug || '',
        subSubCategorySlug: item.subSubCategorySlug || '',
      };
      await FilterConfig.findOneAndUpdate(
        { slug, ...scope },
        { ...item, slug, ...scope },
        { upsert: true, new: true }
      );
    }
    const groups = await FilterConfig.find().sort({ sortOrder: 1 });
    res.json({ message: 'Filter defaults seeded', count: groups.length, groups });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
