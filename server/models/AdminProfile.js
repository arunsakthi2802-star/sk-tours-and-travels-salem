import mongoose from 'mongoose';

const AdminProfileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: 'admin-primary' },
  username: { type: String, required: true, default: 'sk@admin' },
  password: { type: String, required: true, default: 'sk@admin28' },
  name: { type: String, required: true, default: 'Sakthivel C' },
  role: { type: String, default: 'Super Admin' },
  email: { type: String, default: 'admin@sktours.com' },
  phone: { type: String, default: '+91 99946 44744' },
  avatar: { type: String, default: '' },
  branch: { type: String, default: 'Salem HQ (Fairlands)' },
  bio: { type: String, default: 'Managing luxury travel itineraries and operations at SK Tours & Travels Salem.' },
  permissions: { type: [String], default: ['all'] },
  lastLogin: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.AdminProfile || mongoose.model('AdminProfile', AdminProfileSchema);
