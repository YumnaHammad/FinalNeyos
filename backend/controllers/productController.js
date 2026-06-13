const Product = require('../models/Product');
const { generateDataSheetPdf, safeName } = require('../utils/generateDataSheetPdf');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const findProductByParam = async (param) => {
  const decoded = decodeURIComponent(param || '');
  if (!decoded) return null;

  if (/^[a-f0-9]{24}$/i.test(decoded)) {
    const byId = await Product.findById(decoded);
    if (byId) return byId;
  }

  return (
    (await Product.findOne({ slug: decoded })) ||
    (await Product.findOne({ slug: slugify(decoded) }))
  );
};

exports.listProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.categorySlug) filter.categorySlug = req.query.categorySlug;
    if (req.query.subCategorySlug) filter.subCategorySlug = req.query.subCategorySlug;
    if (req.query.subSubCategorySlug) filter.subSubCategorySlug = req.query.subSubCategorySlug;
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
    const product = await findProductByParam(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadDataSheet = async (req, res) => {
  try {
    const product = await findProductByParam(req.params.slug);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const fileName = safeName(product);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    generateDataSheetPdf(product, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: err.message || 'Failed to generate data sheet' });
    }
  }
};

exports.searchListLegacy = async (_req, res) => {
  try {
    const FilterConfig = require('../models/FilterConfig');
    const groups = await FilterConfig.find({ isActive: { $ne: false } }).sort({
      sortOrder: 1,
      attribute: 1,
    });
    if (groups.length > 0) {
      return res.json(
        groups.map((g, idx) => ({
          id: g._id || idx + 1,
          attribute: g.attribute,
          items: (g.items || []).map((item, i) => ({
            id: item._id || i + 1,
            item: item.item,
          })),
        }))
      );
    }
    const filterDefaults = require('../constants/filterDefaults');
    return res.json(
      filterDefaults.map((g, idx) => ({
        id: idx + 1,
        attribute: g.attribute,
        items: (g.items || []).map((item, i) => ({ id: i + 1, item: item.item })),
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSpecifications = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        specifications: req.body.specifications || {},
        filterTags: req.body.filterTags || [],
      },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const assertUniqueInFamily = async (data, excludeId) => {
  if (!data.subSubCategorySlug) {
    const err = new Error('Product family (3rd sub-category) is required');
    err.status = 400;
    throw err;
  }
  if (data.model) {
    const modelQuery = {
      model: data.model,
      categorySlug: data.categorySlug || '',
      subCategorySlug: data.subCategorySlug || '',
      subSubCategorySlug: data.subSubCategorySlug,
    };
    if (excludeId) modelQuery._id = { $ne: excludeId };
    const dupModel = await Product.findOne(modelQuery);
    if (dupModel) {
      const err = new Error(
        `Model "${data.model}" already exists in this product family (${data.subSubCategorySlug})`
      );
      err.status = 400;
      throw err;
    }
  }
  const slug = data.slug ? slugify(data.slug) : '';
  if (slug) {
    const slugQuery = { slug };
    if (excludeId) slugQuery._id = { $ne: excludeId };
    const dupSlug = await Product.findOne(slugQuery);
    if (dupSlug) {
      const err = new Error(`URL slug "${slug}" is already used by another product`);
      err.status = 400;
      throw err;
    }
  }
};

exports.createProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.model) data.slug = slugify(data.model);
    if (data.slug) data.slug = slugify(data.slug);
    await assertUniqueInFamily(data);
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.slug) data.slug = slugify(data.slug);
    await assertUniqueInFamily(data, req.params.id);
    const product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
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
