const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./lib/connectDB');

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(morgan('dev'));

const uploadsPath = path.join(__dirname, 'uploads');
const tmpUploadsPath = path.join('/tmp', 'nexyos-uploads');

const uploadStaticOptions = {
  setHeaders(res) {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
  },
};

app.use('/uploads', express.static(uploadsPath, uploadStaticOptions));
if (process.env.VERCEL) {
  app.use('/uploads', express.static(tmpUploadsPath, uploadStaticOptions));
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(503).json({ message: 'Database connection failed' });
  }
});

const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const filterConfigRoutes = require('./routes/filterConfigRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsRoutes = require('./routes/newsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const salesInquiryRoutes = require('./routes/salesInquiryRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/filter-config', filterConfigRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/sales-inquiries', salesInquiryRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api', sectionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Nexyos API is running...' });
});

module.exports = app;
