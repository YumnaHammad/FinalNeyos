const Vendor = require('../models/Vendor');
const Product = require('../models/Product');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getVendorId = (req) => req.headers['x-vendor-id'] || req.query.vendorId;

const requireVendor = async (req, res, next) => {
  try {
    const id = getVendorId(req);
    if (!id) return res.status(401).json({ message: 'Vendor authentication required' });
    const vendor = await Vendor.findById(id);
    if (!vendor || !vendor.isActive) {
      return res.status(401).json({ message: 'Invalid or inactive vendor account' });
    }
    req.vendor = vendor;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const vendor = await Vendor.findOne({ email });
    if (!vendor || vendor.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!vendor.isActive) {
      return res.status(403).json({ message: 'Account is disabled. Contact Nexyos admin.' });
    }
    res.json({
      id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      company: vendor.company,
      phone: vendor.phone,
      country: vendor.country,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const vendor = req.vendor;
    res.json({
      id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      company: vendor.company,
      phone: vendor.phone,
      country: vendor.country,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};
    ['name', 'company', 'phone', 'country'].forEach((k) => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });
    if (req.body.password) updates.password = req.body.password;
    const vendor = await Vendor.findByIdAndUpdate(req.vendor._id, updates, {
      new: true,
      runValidators: true,
    });
    res.json({
      id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      company: vendor.company,
      phone: vendor.phone,
      country: vendor.country,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.listVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendor._id }).sort({
      sortOrder: 1,
      title: 1,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createVendorProduct = async (req, res) => {
  try {
    const data = { ...req.body, vendorId: req.vendor._id };
    if (!data.slug && data.model) data.slug = slugify(data.model);
    if (data.slug) data.slug = slugify(data.slug);
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateVendorProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      vendorId: req.vendor._id,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const data = { ...req.body };
    delete data.vendorId;
    if (data.slug) data.slug = slugify(data.slug);
    const updated = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteVendorProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendorId: req.vendor._id,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const [total, active, newCount, hotCount] = await Promise.all([
      Product.countDocuments({ vendorId }),
      Product.countDocuments({ vendorId, isActive: true }),
      Product.countDocuments({ vendorId, isNew: true }),
      Product.countDocuments({ vendorId, isHot: true }),
    ]);
    res.json({ total, active, newCount, hotCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin endpoints
exports.listAll = async (_req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors.map((v) => ({ ...v.toObject(), password: undefined })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email || !req.body.password || !req.body.name) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const existing = await Vendor.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const vendor = await Vendor.create({
      name: req.body.name,
      email,
      password: req.body.password,
      company: req.body.company || '',
      phone: req.body.phone || '',
      country: req.body.country || '',
      isActive: req.body.isActive !== false,
    });
    const obj = vendor.toObject();
    delete obj.password;
    res.status(201).json(obj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.email) updates.email = String(updates.email).trim().toLowerCase();
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    const obj = vendor.toObject();
    delete obj.password;
    res.json(obj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedDefault = async (_req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { email: 'vendor@nexyos.com' },
      {
        name: 'Demo Vendor',
        email: 'vendor@nexyos.com',
        password: '123123',
        company: 'Nexyos Demo Supplies',
        phone: '+91 8008008841',
        country: 'India',
        isActive: true,
      },
      { upsert: true, new: true }
    );
    const obj = vendor.toObject();
    delete obj.password;
    res.json({ message: 'Default vendor ready', vendor: obj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.requireVendor = requireVendor;
