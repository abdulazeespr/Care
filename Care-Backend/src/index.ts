import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import parentRoutes from './routes/ParentRoute';
import vitalRoutes from './routes/vitalRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parents', parentRoutes);
app.use('/api/parents/:parentId/vitals', vitalRoutes);

// Health check
app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Care Vitals API is running' });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/care-vitals';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });