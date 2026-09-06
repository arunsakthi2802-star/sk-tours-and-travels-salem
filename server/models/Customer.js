import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  city: { type: String, default: 'Salem' },
  tripsCompleted: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastTrip: { type: String, default: '' },
  joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  bookings: [{
    id: String,
    tourName: String,
    travelDate: String,
    amount: Number,
    status: String
  }]
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);
