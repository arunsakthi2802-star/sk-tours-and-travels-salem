import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String },
  duration: { type: String, default: '3 Days / 2 Nights' },
  category: { type: String, default: 'General' },
  price: { type: Number, default: 0 },
  offerPrice: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  itinerary: [{
    day: Number,
    title: String,
    desc: String,
    stay: String,
    meals: String
  }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  departures: [{ type: String }],
  published: { type: Boolean, default: true },
  isPremium: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  pricingTable: { type: mongoose.Schema.Types.Mixed, default: null },
  vehicleOptions: [{ type: String }]
}, { timestamps: true, strict: false });

export default mongoose.model('Tour', TourSchema);
