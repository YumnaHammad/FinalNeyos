const News = require('../models/News');
const newsDefaults = require('../constants/newsDefaults');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formatLegacy = (doc) => {
  if (!doc) return null;
  const n = doc.toObject ? doc.toObject() : doc;
  const date = n.publishedAt ? new Date(n.publishedAt) : new Date();
  return {
    ...n,
    id: n._id,
    head: n.title,
    desc: n.content || n.excerpt,
    date: date.toISOString().slice(0, 10),
    year: n.year || date.getFullYear(),
  };
};

exports.getMeta = (_req, res) => {
  res.json({
    productLines: newsDefaults.productLines,
    topics: newsDefaults.topics,
    years: newsDefaults.posts.map((p) => p.year).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => b - a),
  });
};

exports.listNews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.admin !== '1') filter.isPublished = true;

    if (req.query.year && req.query.year !== 'All') {
      filter.year = Number(req.query.year);
    }

    if (req.query.productLine && req.query.productLine !== 'All') {
      filter.productLine = req.query.productLine;
    }

    if (req.query.topic && req.query.topic !== 'All') {
      filter.topic = req.query.topic;
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { excerpt: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') },
      ];
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      News.find(filter).sort({ publishedAt: -1, sortOrder: 1 }).skip(skip).limit(limit),
      News.countDocuments(filter),
    ]);

    if (req.query.legacy === '1') {
      return res.json(items.map(formatLegacy));
    }

    res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const param = decodeURIComponent(req.params.id || '');
    let item = null;

    if (/^[a-f0-9]{24}$/i.test(param)) {
      item = await News.findById(param);
    }
    if (!item && param) {
      item =
        (await News.findOne({ slug: param })) ||
        (await News.findOne({ slug: slugify(param) }));
    }

    if (!item) return res.status(404).json({ message: 'News article not found' });
    if (!item.isPublished && req.query.admin !== '1') {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json(req.query.legacy === '1' ? formatLegacy(item) : item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const title = String(req.body.title || '').trim();
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const slug = slugify(req.body.slug || title);
    const existing = await News.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Slug already exists' });

    const publishedAt = req.body.publishedAt ? new Date(req.body.publishedAt) : new Date();
    const year = req.body.year ? Number(req.body.year) : publishedAt.getFullYear();

    const item = await News.create({
      title,
      slug,
      excerpt: req.body.excerpt || '',
      content: req.body.content || '',
      image: req.body.image || '',
      year,
      productLine: req.body.productLine || '',
      topic: req.body.topic || '',
      isPublished: req.body.isPublished !== false,
      publishedAt,
      sortOrder: req.body.sortOrder || 0,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.title && !updates.slug) updates.slug = slugify(updates.title);
    if (updates.slug) updates.slug = slugify(updates.slug);
    if (updates.publishedAt) updates.publishedAt = new Date(updates.publishedAt);
    if (updates.year) updates.year = Number(updates.year);
    else if (updates.publishedAt) updates.year = new Date(updates.publishedAt).getFullYear();

    const item = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'News article not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const item = await News.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'News article not found' });
    res.json({ message: 'News article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedDefaults = async (_req, res) => {
  try {
    for (const post of newsDefaults.posts) {
      await News.findOneAndUpdate({ slug: post.slug }, post, { upsert: true, new: true });
    }
    const count = await News.countDocuments();
    res.json({ message: 'News seed complete', count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listYears = async (_req, res) => {
  try {
    const years = await News.distinct('year');
    res.json(years.filter(Boolean).sort((a, b) => b - a));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
