const Category = require('../models/Category');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
    if (req.query.legacy === '1') {
      return res.json(
        categories.map((c) => ({
          id: c._id,
          category: c.name,
          slug: c.slug,
          image: c.image,
        }))
      );
    }
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const raw = decodeURIComponent(req.params.slug || '');
    const slugParam = slugify(raw);

    let category =
      (slugParam && (await Category.findOne({ slug: slugParam }))) ||
      (raw && (await Category.findOne({ slug: raw })));

    if (!category && raw) {
      const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      category = await Category.findOne({ name: new RegExp(`^${escaped}$`, 'i') });
    }

    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubCategoriesLegacy = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(
      (category.subCategories || []).map((sub) => ({
        id: sub._id,
        sub_category: sub.name,
        image: sub.image,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getThirdLevelLegacy = async (req, res) => {
  try {
    const category = await Category.findById(req.params.catId);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const sub = category.subCategories.id(req.params.subId);
    if (!sub) return res.status(404).json({ message: 'Sub-category not found' });
    res.json(
      (sub.subSubCategories || []).map((ssc) => ({
        id: ssc._id,
        third_level_cat: ssc.name,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.name) data.slug = slugify(data.name);
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.slug) data.slug = slugify(data.slug);
    const category = await Category.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loadDefaults = async (_req, res) => {
  try {
    const defaults = require('../constants/categoryDefaults');
    res.json(defaults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedDefaults = async (_req, res) => {
  try {
    const defaults = require('../constants/categoryDefaults');
    for (const item of defaults) {
      await Category.findOneAndUpdate({ slug: item.slug }, item, {
        upsert: true,
        new: true,
      });
    }
    const categories = await Category.find().sort({ sortOrder: 1 });
    res.json({ message: 'Categories seeded', count: categories.length, categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
