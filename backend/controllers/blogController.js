const Blog = require('../models/Blog');
const BlogCategory = require('../models/BlogCategory');
const blogDefaults = require('../constants/blogDefaults');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formatBlog = (doc) => {
  if (!doc) return null;
  const b = doc.toObject ? doc.toObject() : doc;
  return {
    ...b,
    id: b._id,
    head: b.title,
    desc: b.content || b.excerpt,
  };
};

exports.listCategories = async (_req, res) => {
  try {
    const categories = await BlogCategory.find().sort({ sortOrder: 1, name: 1 });
    res.json(categories.map((c) => ({ id: c._id, name: c.name, slug: c.slug })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const slug = slugify(req.body.slug || name);
    const category = await BlogCategory.create({ name, slug, sortOrder: req.body.sortOrder || 0 });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.name) updates.slug = slugify(updates.slug || updates.name);
    const category = await BlogCategory.findByIdAndUpdate(req.params.id, updates, {
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
    const category = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listBlogs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.admin !== '1') filter.isPublished = true;

    if (req.query.category && req.query.category !== 'All') {
      filter.categories = req.query.category;
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { excerpt: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') },
      ];
    }

    if (req.query.featured === '1') filter.isFeatured = true;

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
    const skip = (page - 1) * limit;

    const sort =
      req.query.sort === 'oldest'
        ? { publishedAt: 1, sortOrder: 1 }
        : { publishedAt: -1, sortOrder: 1 };

    const [items, total] = await Promise.all([
      Blog.find(filter).sort(sort).skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ]);

    if (req.query.legacy === '1') {
      return res.json(items.map(formatBlog));
    }

    res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const param = decodeURIComponent(req.params.id || '');
    let blog = null;

    if (/^[a-f0-9]{24}$/i.test(param)) {
      blog = await Blog.findById(param);
    }
    if (!blog && param) {
      blog =
        (await Blog.findOne({ slug: param })) ||
        (await Blog.findOne({ slug: slugify(param) }));
    }

    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    if (!blog.isPublished && req.query.admin !== '1') {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(req.query.legacy === '1' ? formatBlog(blog) : blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const title = String(req.body.title || '').trim();
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const slug = slugify(req.body.slug || title);
    const existing = await Blog.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Slug already exists' });

    if (req.body.isFeatured) {
      await Blog.updateMany({}, { isFeatured: false });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt: req.body.excerpt || '',
      content: req.body.content || '',
      image: req.body.image || '',
      categories: Array.isArray(req.body.categories) ? req.body.categories : [],
      isFeatured: !!req.body.isFeatured,
      isPublished: req.body.isPublished !== false,
      publishedAt: req.body.publishedAt || new Date(),
      sortOrder: req.body.sortOrder || 0,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.title && !updates.slug) updates.slug = slugify(updates.title);
    if (updates.slug) updates.slug = slugify(updates.slug);

    if (updates.isFeatured) {
      await Blog.updateMany({ _id: { $ne: req.params.id } }, { isFeatured: false });
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedDefaults = async (_req, res) => {
  try {
    for (const cat of blogDefaults.categories) {
      await BlogCategory.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    }
    for (const post of blogDefaults.posts) {
      await Blog.findOneAndUpdate({ slug: post.slug }, post, { upsert: true, new: true });
    }
    const count = await Blog.countDocuments();
    res.json({ message: 'Blog seed complete', count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
