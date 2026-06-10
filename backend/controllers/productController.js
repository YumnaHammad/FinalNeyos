const Product = require('../models/Product');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

exports.listProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.categorySlug) filter.categorySlug = req.query.categorySlug;
    if (req.query.active !== '0') filter.isActive = true;

    const products = await Product.find(filter).sort({ sortOrder: 1, title: 1 });

    if (req.query.legacy === '1') {
      return res.json(
        products.map((p) => ({
          id: p._id,
          title: p.title,
          model: p.model,
          image: p.image,
        }))
      );
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchListLegacy = async (_req, res) => {
  try {
    res.json([
      {
        id: 1,
        attribute: 'Resolution',
        items: [
          { id: 1, item: '4MP' },
          { id: 2, item: '8MP' },
        ],
      },
      {
        id: 2,
        attribute: 'Type',
        items: [
          { id: 3, item: 'Dome' },
          { id: 4, item: 'Bullet' },
          { id: 5, item: 'PTZ' },
        ],
      },
    ]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) data.slug = slugify(data.title);
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.slug) data.slug = slugify(data.slug);
    const product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedDefaults = async (_req, res) => {
  try {
    const defaults = require('../constants/productDefaults');
    for (const item of defaults) {
      await Product.findOneAndUpdate({ slug: item.slug }, item, {
        upsert: true,
        new: true,
      });
    }
    const products = await Product.find().sort({ sortOrder: 1 });
    res.json({ message: 'Products seeded', count: products.length, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
