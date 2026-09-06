import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, default: 'Tour Manager' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Staff', StaffSchema);
