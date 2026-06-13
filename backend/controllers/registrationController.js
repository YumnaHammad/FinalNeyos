const RegisteredUser = require('../models/RegisteredUser');

const stripPassword = (doc) => {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  delete obj.password;
  return obj;
};

exports.register = async (req, res) => {
  try {
    const {
      type,
      country,
      firstName,
      lastName,
      companyName,
      email,
      password,
      verificationCode,
      partnerPortal,
      subscribe,
    } = req.body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await RegisteredUser.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const user = await RegisteredUser.create({
      type: type || '',
      country: country || '',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      companyName: companyName || '',
      email: normalizedEmail,
      password,
      verificationCode: verificationCode || '',
      partnerPortal: partnerPortal === 'yes' ? 'yes' : partnerPortal === 'no' ? 'no' : '',
      subscribe: !!subscribe,
    });

    res.status(201).json({
      message: 'Registration successful',
      user: stripPassword(user),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await RegisteredUser.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is disabled. Contact Nexyos support.' });
    }

    res.json({
      message: 'Login successful',
      user: stripPassword(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listAll = async (_req, res) => {
  try {
    const users = await RegisteredUser.find().sort({ createdAt: -1 });
    res.json(users.map(stripPassword));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!req.body.firstName?.trim() || !req.body.lastName?.trim() || !email || !req.body.password) {
      return res.status(400).json({ message: 'First name, last name, email, and password are required' });
    }

    const exists = await RegisteredUser.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await RegisteredUser.create({
      type: req.body.type || '',
      country: req.body.country || '',
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      companyName: req.body.companyName || '',
      email,
      password: req.body.password,
      verificationCode: req.body.verificationCode || '',
      partnerPortal: req.body.partnerPortal === 'yes' ? 'yes' : req.body.partnerPortal === 'no' ? 'no' : '',
      subscribe: !!req.body.subscribe,
      isActive: req.body.isActive !== false,
    });

    res.status(201).json(stripPassword(user));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updates = {};
    [
      'type',
      'country',
      'firstName',
      'lastName',
      'companyName',
      'email',
      'verificationCode',
      'partnerPortal',
      'subscribe',
      'isActive',
    ].forEach((k) => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });
    if (req.body.email) updates.email = String(req.body.email).trim().toLowerCase();
    if (req.body.password) updates.password = req.body.password;

    const user = await RegisteredUser.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(stripPassword(user));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await RegisteredUser.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
