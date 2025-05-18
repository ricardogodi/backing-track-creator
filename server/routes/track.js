/** server/routes/track.js */

import express from 'express';
import { saveTrack, loadTracks, deleteTrack } from '../controllers/trackController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveTrack);
router.get('/load', authMiddleware, loadTracks);
router.delete('/:id', authMiddleware, deleteTrack);

export default router;