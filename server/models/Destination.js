import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tag: { type: String, default: '' },
  toursCount: { type: Number, default: 0 },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  startingPrice: { type: Number, default: 0 },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Destination', DestinationSchema);
