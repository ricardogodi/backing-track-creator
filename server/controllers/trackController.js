/** server/controllers/trackController.js */

import User from '../models/User.js';

export const saveTrack = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { name } = req.body;

    const nameExists = user.tracks.some(track => track.name === name);
    if (nameExists) {
      return res.status(400).json({ message: 'Track name already exists.' });
    }

    user.tracks.push(req.body);
    await user.save();

    res.json({ message: 'Track saved' });
  } catch (err) {
    console.error('Backend error saving track:', err);
    res.status(500).json({ message: 'Error saving track' });
  }
};

export const loadTracks = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.tracks);
  } catch {
    res.status(500).json({ message: 'Error loading tracks' });
  }
};