/** server/routes/track.js */

import express from 'express';
import { saveTrack, loadTracks } from '../controllers/trackController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveTrack);
router.get('/load', authMiddleware, loadTracks);

export default router;
