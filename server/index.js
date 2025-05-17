// server/index.js

import express from 'express';
import cors from 'cors';
import connectDB from './db.js'; // Connect to MongoDB
import authRoutes from './routes/auth.js'; // Auth endpoints
import trackRoutes from './routes/track.js'; // Track save/load endpoints

const app = express();
const PORT = 3001;

// Connect to MongoDB on startup
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);   // POST /api/auth/register, POST /api/auth/login
app.use('/api/track', trackRoutes); // POST /api/track/save, GET /api/track/load

// Root route for quick status check
app.get('/', (req, res) => {
  res.send('Backing Track API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});