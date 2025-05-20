// server/index.js

import express from 'express';
import cors from 'cors'; // "Cross-Origin Resource Sharing"
import connectDB from './db.js'; // For connecting to MongoDB
import authRoutes from './routes/auth.js'; // Auth endpoints
import trackRoutes from './routes/track.js'; // Track save/load endpoints

/**
 * Initialize an Express application instance.
 */
const app = express();
/** 
 * Define port number where server will listen for requests.
 * Platform of deployment will assign a port via process.env.PORT, if it fails
 * it will fall back to 3001, which will be useful for local development.
 * */ 
const PORT = process.env.PORT || 3001;

/**
 * Call connectDB defined in ./db.js. 
 * Establish connection with the MongoDB
 */
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