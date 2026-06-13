const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = process.env.VERCEL
  ? path.join('/tmp', 'nexyos-uploads')
  : path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.png';
    cb(null, 'upload-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Upload failed' });
    }
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const relativePath = `/uploads/${req.file.filename}`;
      const host = req.get('host') || `localhost:${process.env.PORT || 5000}`;
      const protocol = req.protocol || 'http';
      res.json({
        message: 'File uploaded successfully',
        url: relativePath,
        absoluteUrl: `${protocol}://${host}${relativePath}`,
        filename: req.file.filename,
      });
    } catch (e) {
      res.status(500).json({ message: 'Upload failed: ' + e.message });
    }
  });
});

module.exports = router;
