import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  city: { type: String, default: 'Salem' },
  rating: { type: Number, default: 5 },
  tourTaken: { type: String, default: '' },
  travelDate: { type: String, default: '' },
  comment: { type: String, required: true },
  status: { type: String, default: 'Approved' },
  featured: { type: Boolean, default: false },
  avatar: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Feedback', FeedbackSchema);
