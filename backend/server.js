const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

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
app.use(
  '/uploads',
  express.static(uploadsPath, {
    setHeaders(res) {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Access-Control-Allow-Origin', '*');
    },
  })
);

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

const PORT = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexyos');
    console.log('Connected to MongoDB Successfully');
    const FilterConfig = require('./models/FilterConfig');
    try {
      await FilterConfig.collection.dropIndex('attribute_1');
    } catch {
      /* legacy index may not exist */
    }
    await FilterConfig.syncIndexes();
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB runtime error:', err.message);
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
