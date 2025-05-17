/** server/models/User.js*/

import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  style: String,
  drums: String,
  bass: String,
  tempo: Number,
  chords: { type: [Object] }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String, // will be hashed
  tracks: [trackSchema]
}, { timestamps: true });

export default mongoose.model('User', userSchema);

