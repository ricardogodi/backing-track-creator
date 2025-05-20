/** server/controllers/trackController.js */

import User from '../models/User.js';

export const saveTrack = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { name, style, drums, bass, tempo, chords } = req.body;

    const nameExists = user.tracks.some(track => track.name === name);
    if (nameExists) {
      return res.status(400).json({ message: 'Track name already exists.' });
    }

    // Let Mongoose assign an _id properly
    const savedTrack = user.tracks.create(req.body);
    user.tracks.push(savedTrack);
    await user.save();
    res.json({ message: 'Track saved', track: savedTrack });
  } catch (err) {
    console.error('Backend error saving track:', err);
    res.status(500).json({ message: 'Error saving track' });
  }
};

export const fetchTracks = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.tracks);
  } catch {
    res.status(500).json({ message: 'Error loading tracks' });
  }
};

export const deleteTrack = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { id } = req.params;

    const initialLength = user.tracks.length;
    user.tracks = user.tracks.filter(track => track._id.toString() !== id);

    if (user.tracks.length === initialLength) {
      return res.status(404).json({ message: 'Track not found.' });
    }

    await user.save();
    res.json({ message: 'Track deleted successfully.' });
  } catch (err) {
    console.error('Error deleting track:', err);
    res.status(500).json({ message: 'Error deleting track.' });
  }
};