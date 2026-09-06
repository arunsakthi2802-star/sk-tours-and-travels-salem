import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  destination: { type: String, default: 'Flexible' },
  travelDate: { type: String, default: '' },
  returnDate: { type: String, default: '' },
  adults: { type: Number, default: 2 },
  children: { type: Number, default: 0 },
  budget: { type: String, default: '' },
  tourType: { type: String, default: 'group' },
  source: { type: String, default: 'Website Enquiry' },
  assignedStaff: { type: String, default: 'Admin' },
  status: { type: String, default: 'New' },
  priority: { type: String, default: 'Medium' },
  createdDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  followUpDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  followUpTime: { type: String, default: '11:00 AM' },
  quotationAmount: { type: Number, default: null },
  specialRequirements: { type: String, default: '' },
  notes: [{
    id: String,
    date: String,
    author: String,
    text: String
  }]
}, { timestamps: true });

export default mongoose.model('Lead', LeadSchema);
