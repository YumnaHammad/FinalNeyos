const Event = require('../models/Event');
const eventDefaults = require('../constants/eventDefaults');

const resolveStatus = (doc) => {
  const e = doc.toObject ? doc.toObject() : { ...doc };
  const now = new Date();
  if (e.endDate && new Date(e.endDate) < now) {
    return 'ended';
  }
  if (e.startDate && new Date(e.startDate) > now && e.status === 'register') {
    return e.status;
  }
  return e.status || 'register';
};

const formatEvent = (doc) => {
  if (!doc) return null;
  const e = doc.toObject ? doc.toObject() : doc;
  return {
    ...e,
    status: resolveStatus(e),
  };
};

exports.getMeta = (_req, res) => {
  res.json({
    categories: eventDefaults.categories,
  });
};

exports.listEvents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.admin !== '1') filter.isPublished = true;

    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }

    const items = await Event.find(filter).sort({ sortOrder: 1, startDate: -1 });
    res.json(items.map(formatEvent));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const item = await Event.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Event not found' });
    if (!item.isPublished && req.query.admin !== '1') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(formatEvent(item));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const title = String(req.body.title || '').trim();
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const item = await Event.create({
      title,
      image: req.body.image || '',
      dateDisplay: req.body.dateDisplay || '',
      startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
      endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      location: req.body.location || '',
      booth: req.body.booth || '',
      category: req.body.category || 'IoT',
      registrationUrl: req.body.registrationUrl || '',
      status: req.body.status || 'register',
      isPublished: req.body.isPublished !== false,
      sortOrder: req.body.sortOrder || 0,
    });

    res.status(201).json(formatEvent(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.startDate) updates.startDate = new Date(updates.startDate);
    if (updates.endDate) updates.endDate = new Date(updates.endDate);

    const item = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Event not found' });
    res.json(formatEvent(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const item = await Event.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedDefaults = async (_req, res) => {
  try {
    for (const ev of eventDefaults.events) {
      await Event.findOneAndUpdate({ title: ev.title }, ev, { upsert: true, new: true });
    }
    const count = await Event.countDocuments();
    res.json({ message: 'Events seed complete', count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
