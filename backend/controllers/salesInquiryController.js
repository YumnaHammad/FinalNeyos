const SalesInquiry = require('../models/SalesInquiry');
const Product = require('../models/Product');

const resolveProductContext = async (body) => {
  let product = null;
  if (body.productId) {
    product = await Product.findById(body.productId);
  } else if (body.productSlug) {
    product = await Product.findOne({ slug: body.productSlug });
  }

  if (product) {
    return {
      productId: product._id,
      productSlug: product.slug || '',
      productModel: product.model || body.productModel || '',
      productTitle: product.title || body.productTitle || '',
      vendorId: product.vendorId || null,
    };
  }

  return {
    productId: null,
    productSlug: body.productSlug || '',
    productModel: body.productModel || '',
    productTitle: body.productTitle || '',
    vendorId: null,
  };
};

exports.create = async (req, res) => {
  try {
    const {
      userType,
      firstName,
      lastName,
      email,
      phone,
      country,
      province,
      city,
      postcode,
      message,
      companyName,
      businessRole,
      industry,
      jobTitle,
      subscribe,
    } = req.body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }
    if (!country || !province?.trim() || !city?.trim()) {
      return res.status(400).json({ message: 'Location fields are required' });
    }

    const productContext = await resolveProductContext(req.body);

    const inquiry = await SalesInquiry.create({
      userType: userType === 'personal' ? 'personal' : 'business',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || '',
      country,
      province: province.trim(),
      city: city.trim(),
      postcode: postcode || '',
      message: message.trim(),
      companyName: companyName || '',
      businessRole: businessRole || '',
      industry: industry || '',
      jobTitle: jobTitle || '',
      subscribe: !!subscribe,
      ...productContext,
    });

    res.status(201).json({ message: 'Inquiry submitted successfully', id: inquiry._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.listAll = async (_req, res) => {
  try {
    const items = await SalesInquiry.find()
      .sort({ createdAt: -1 })
      .populate('vendorId', 'name company email')
      .lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listForVendor = async (req, res) => {
  try {
    const items = await SalesInquiry.find({
      $or: [{ vendorId: req.vendor._id }, { vendorId: null }],
    })
      .sort({ createdAt: -1 })
      .lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (_req, res) => {
  try {
    const [total, unread] = await Promise.all([
      SalesInquiry.countDocuments(),
      SalesInquiry.countDocuments({ status: 'new' }),
    ]);
    res.json({ total, unread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVendorStats = async (req, res) => {
  try {
    const filter = {
      $or: [{ vendorId: req.vendor._id }, { vendorId: null }],
    };
    const [total, unread] = await Promise.all([
      SalesInquiry.countDocuments(filter),
      SalesInquiry.countDocuments({ ...filter, status: 'new' }),
    ]);
    res.json({ total, unread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const inquiry = await SalesInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateVendorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const inquiry = await SalesInquiry.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [{ vendorId: req.vendor._id }, { vendorId: null }],
      },
      { status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const inquiry = await SalesInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
