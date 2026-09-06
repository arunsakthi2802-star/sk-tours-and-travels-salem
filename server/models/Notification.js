import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  time: { type: String, default: 'Just now' },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Notification', NotificationSchema);
