const Section = require('../models/Section');

exports.getSection = async (req, res) => {
  try {
    const { page, sectionName } = req.params;
    const section = await Section.findOne({ page, sectionName });
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { page, sectionName } = req.params;
    const data = req.body;
    const mongoose = require('mongoose');

    if (data.replaceAll && Array.isArray(data.content)) {
      const items = data.content.map((item) => ({
        ...item,
        _id: item._id || new mongoose.Types.ObjectId().toString(),
      }));
      const saved = await Section.findOneAndUpdate(
        { page, sectionName },
        { page, sectionName, content: items },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json(saved);
    }

    let section = await Section.findOne({ page, sectionName });

    if (!data._id && !data.id) {
      data._id = new mongoose.Types.ObjectId().toString();
    }

    if (!section) {
      section = new Section({ page, sectionName, content: [data] });
    } else {
      if (!Array.isArray(section.content)) section.content = [];
      const existingIdx = section.content.findIndex(
        (item) =>
          (data._id && item._id && item._id.toString() === data._id.toString()) ||
          (data.id && item.id && item.id.toString() === data.id.toString())
      );
      if (existingIdx > -1) {
        section.content[existingIdx] = { ...section.content[existingIdx], ...data };
      } else {
        section.content.push(data);
      }
    }

    section.markModified('content');
    const saved = await section.save({ validateBeforeSave: false });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

exports.getPageSections = async (req, res) => {
  try {
    const sections = await Section.find({ page: req.params.page });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { page, sectionName } = req.params;
    const { id, index } = req.body;

    const section = await Section.findOne({ page, sectionName });
    if (!section || !Array.isArray(section.content)) {
      return res.status(404).json({ message: 'Section or content not found' });
    }

    if (id && id !== 'null') {
      const before = section.content.length;
      section.content = section.content.filter((item) => {
        const itemId = (item._id || item.id || '').toString();
        return itemId !== id.toString();
      });
      if (section.content.length === before && typeof index === 'number') {
        section.content.splice(index, 1);
      }
    } else if (typeof index === 'number') {
      section.content.splice(index, 1);
    } else {
      await Section.findOneAndDelete({ page, sectionName });
      return res.json({ message: 'Section deleted successfully' });
    }

    section.markModified('content');
    await section.save();
    res.json({ message: 'Item removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
