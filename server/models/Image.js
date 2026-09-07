import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  filename: { type: String, default: 'image.jpg' },
  contentType: { type: String, default: 'image/jpeg' },
  data: { type: String, required: true },
  size: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
