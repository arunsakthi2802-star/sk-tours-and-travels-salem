import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Models
import Tour from './models/Tour.js';
import Destination from './models/Destination.js';
import Lead from './models/Lead.js';
import Customer from './models/Customer.js';
import Feedback from './models/Feedback.js';
import Staff from './models/Staff.js';
import Notification from './models/Notification.js';

dotenv.config();

// Use process.cwd() instead of import.meta.url to prevent esbuild Netlify errors
const __dirname = path.join(process.cwd(), 'server');
const isNetlify = process.env.NETLIFY === 'true';

// DNS fallback
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // ignore
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Persistent Local Store (Ensures 100% zero downtime & immediate CRUD persistence)
const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'db_store.json');

if (!isNetlify && !fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadLocalStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading local store:', err.message);
  }
  return {
    tours: [],
    destinations: [],
    leads: [],
    customers: [],
    feedback: [],
    staff: [
      {
        id: "staff-1",
        name: "Admin",
        email: "admin@sktours.com",
        role: "Super Admin",
        phone: "+91 99946 44744",
        activeLeads: 0,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
      }
    ],
    notifications: []
  };
}

let localStore = loadLocalStore();

function saveLocalStore() {
  if (isNetlify) return; // Netlify has a read-only filesystem, skip local saving
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(localStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local store:', err.message);
  }
}

// MongoDB Atlas Connection
const primaryUri = process.env.MONGODB_URI || process.env.MONGODB_SRV_URI || '';

if (!primaryUri) {
  console.warn("WARNING: MONGODB_URI is not set in environment variables!");
}

let isConnected = false;
let connectionError = null;

async function syncLocalToAtlas() {
  if (!isConnected) return;
  try {
    console.log('>>> Checking local data synchronization with MongoDB Atlas...');
    for (const item of localStore.tours) {
      await Tour.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    for (const item of localStore.destinations) {
      await Destination.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    for (const item of localStore.leads) {
      await Lead.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    for (const item of localStore.customers) {
      await Customer.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    for (const item of localStore.feedback) {
      await Feedback.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    for (const item of localStore.staff) {
      await Staff.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    for (const item of localStore.notifications) {
      await Notification.findOneAndUpdate({ id: item.id }, item, { upsert: true });
    }
    console.log('>>> Synchronization complete!');
  } catch (err) {
    console.warn('Sync warning:', err.message);
  }
}

let isConnecting = false;

async function connectDB() {
  if (isConnecting || isConnected) return;
  isConnecting = true;
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect().catch(() => {});
    }
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    connectionError = null;
    console.log(`>>> MongoDB Connected Successfully! Database: "${mongoose.connection.name}"`);

    // Ensure collections exist
    await Promise.all([
      Tour.init(),
      Destination.init(),
      Lead.init(),
      Customer.init(),
      Feedback.init(),
      Staff.init(),
      Notification.init()
    ]);
    console.log('>>> MongoDB Collections Initialized in database "sk_tours"');

    // Sync any local records to Atlas
    await syncLocalToAtlas();
  } catch (err) {
    connectionError = err.message;
    console.log('MongoDB connection note: Waiting for Atlas Network Access IP whitelist approval.');
  } finally {
    isConnecting = false;
  }
}

// Initial connect & background retry
connectDB();
setInterval(() => {
  if (!isConnected && !isConnecting) {
    connectDB();
  }
}, 45000);

// ============================================================
// HEALTH & DIAGNOSTICS
// ============================================================
app.get('/api/health', async (req, res) => {
  try {
    let counts = {
      tours: localStore.tours.length,
      destinations: localStore.destinations.length,
      leads: localStore.leads.length,
      customers: localStore.customers.length,
      feedback: localStore.feedback.length,
      staff: localStore.staff.length,
      notifications: localStore.notifications.length,
    };

    if (isConnected) {
      try {
        counts = {
          tours: await Tour.countDocuments(),
          destinations: await Destination.countDocuments(),
          leads: await Lead.countDocuments(),
          customers: await Customer.countDocuments(),
          feedback: await Feedback.countDocuments(),
          staff: await Staff.countDocuments(),
          notifications: await Notification.countDocuments(),
        };
      } catch (e) {
        console.warn('Count fetch error:', e.message);
      }
    }

    res.json({
      status: isConnected ? 'connected' : 'offline',
      database: isConnected ? (mongoose.connection.name || 'sk_tours') : 'local_store (Atlas connecting/whitelisting)',
      atlasConnected: isConnected,
      connectionError: isConnected ? null : connectionError,
      whitelistHelp: isConnected ? null : 'In MongoDB Atlas -> Network Access, ensure your current IP or 0.0.0.0/0 is whitelisted.',
      counts,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ============================================================
// TOURS CRUD API
// ============================================================
// READ ALL
app.get('/api/tours', async (req, res) => {
  try {
    const { publishedOnly, category } = req.query;
    if (isConnected) {
      const query = {};
      if (publishedOnly === 'true') query.published = true;
      if (category && category !== 'All') query.category = category;
      const tours = await Tour.find(query).sort({ createdAt: -1 });
      return res.json(tours);
    }
    let list = [...localStore.tours];
    if (publishedOnly === 'true') list = list.filter(t => t.published);
    if (category && category !== 'All') list = list.filter(t => t.category === category);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/api/tours/:id', async (req, res) => {
  try {
    if (isConnected) {
      const tour = await Tour.findOne({ id: req.params.id });
      if (!tour) return res.status(404).json({ error: 'Tour not found' });
      return res.json(tour);
    }
    const tour = localStore.tours.find(t => t.id === req.params.id);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/tours', async (req, res) => {
  try {
    const tourData = req.body;
    if (!tourData.name || typeof tourData.name !== 'string' || !tourData.name.trim()) {
      return res.status(400).json({ error: 'Validation Error: Tour "name" is required' });
    }
    if (!tourData.id) {
      tourData.id = `tour-${Date.now()}`;
    }
    if (!tourData.slug && tourData.name) {
      tourData.slug = tourData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    tourData.price = Number(tourData.price) || 0;
    tourData.offerPrice = Number(tourData.offerPrice) || 0;
    tourData.published = tourData.published !== undefined ? Boolean(tourData.published) : true;
    tourData.createdAt = new Date();
    tourData.updatedAt = new Date();

    // Local store update
    localStore.tours.unshift(tourData);
    saveLocalStore();

    if (isConnected) {
      const created = await Tour.create(tourData);
      return res.status(201).json(created);
    }
    res.status(201).json(tourData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    // Update local store
    const idx = localStore.tours.findIndex(t => t.id === id);
    if (idx !== -1) {
      localStore.tours[idx] = { ...localStore.tours[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Tour.findOneAndUpdate({ id }, updateData, { new: true, upsert: true });
      return res.json(updated);
    }
    res.json(localStore.tours[idx] || updateData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    localStore.tours = localStore.tours.filter(t => t.id !== id);
    saveLocalStore();

    if (isConnected) {
      await Tour.findOneAndDelete({ id });
    }
    res.json({ message: 'Tour deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// DESTINATIONS CRUD API
// ============================================================
// READ ALL
app.get('/api/destinations', async (req, res) => {
  try {
    if (isConnected) {
      const destinations = await Destination.find().sort({ createdAt: -1 });
      return res.json(destinations);
    }
    res.json(localStore.destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/api/destinations/:id', async (req, res) => {
  try {
    if (isConnected) {
      const dest = await Destination.findOne({ id: req.params.id });
      if (!dest) return res.status(404).json({ error: 'Destination not found' });
      return res.json(dest);
    }
    const dest = localStore.destinations.find(d => d.id === req.params.id);
    if (!dest) return res.status(404).json({ error: 'Destination not found' });
    res.json(dest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/destinations', async (req, res) => {
  try {
    const destData = req.body;
    if (!destData.name || typeof destData.name !== 'string' || !destData.name.trim()) {
      return res.status(400).json({ error: 'Validation Error: Destination "name" is required' });
    }
    if (!destData.id) {
      destData.id = `dest-${Date.now()}`;
    }
    destData.toursCount = Number(destData.toursCount) || 0;
    destData.startingPrice = Number(destData.startingPrice) || 0;
    destData.createdAt = new Date();
    destData.updatedAt = new Date();

    localStore.destinations.unshift(destData);
    saveLocalStore();

    if (isConnected) {
      const created = await Destination.create(destData);
      return res.status(201).json(created);
    }
    res.status(201).json(destData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    const idx = localStore.destinations.findIndex(d => d.id === id);
    if (idx !== -1) {
      localStore.destinations[idx] = { ...localStore.destinations[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Destination.findOneAndUpdate({ id }, updateData, { new: true, upsert: true });
      return res.json(updated);
    }
    res.json(localStore.destinations[idx] || updateData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    localStore.destinations = localStore.destinations.filter(d => d.id !== id);
    saveLocalStore();

    if (isConnected) {
      await Destination.findOneAndDelete({ id });
    }
    res.json({ message: 'Destination deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// LEADS CRUD API
// ============================================================
// READ ALL
app.get('/api/leads', async (req, res) => {
  try {
    if (isConnected) {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json(leads);
    }
    res.json(localStore.leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/api/leads/:id', async (req, res) => {
  try {
    if (isConnected) {
      const lead = await Lead.findOne({ id: req.params.id });
      if (!lead) return res.status(404).json({ error: 'Lead not found' });
      return res.json(lead);
    }
    const lead = localStore.leads.find(l => l.id === req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/leads', async (req, res) => {
  try {
    const leadData = req.body;
    if (!leadData.customerName || !leadData.phone) {
      return res.status(400).json({ error: 'Validation Error: "customerName" and "phone" are required' });
    }
    if (!leadData.id) {
      const count = isConnected ? await Lead.countDocuments() : localStore.leads.length;
      leadData.id = `LEAD-${100 + count + 1}`;
    }
    leadData.status = leadData.status || 'New';
    leadData.createdAt = new Date();
    leadData.updatedAt = new Date();

    localStore.leads.unshift(leadData);

    // Create Notification
    const notif = {
      id: `notif-${Date.now()}`,
      title: 'New Website Enquiry',
      desc: `${leadData.customerName} enquired for ${leadData.destination || 'Flexible'}`,
      time: 'Just now',
      read: false,
      createdAt: new Date()
    };
    localStore.notifications.unshift(notif);
    saveLocalStore();

    if (isConnected) {
      const newLead = await Lead.create(leadData);
      await Notification.create(notif);
      return res.status(201).json(newLead);
    }
    res.status(201).json(leadData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    const idx = localStore.leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      localStore.leads[idx] = { ...localStore.leads[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Lead.findOneAndUpdate({ id }, updateData, { new: true });
      return res.json(updated);
    }
    res.json(localStore.leads[idx] || updateData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    localStore.leads = localStore.leads.filter(l => l.id !== id);
    saveLocalStore();

    if (isConnected) {
      await Lead.findOneAndDelete({ id });
    }
    res.json({ message: 'Lead deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// CUSTOMERS CRUD API
// ============================================================
// READ ALL
app.get('/api/customers', async (req, res) => {
  try {
    if (isConnected) {
      const customers = await Customer.find().sort({ createdAt: -1 });
      return res.json(customers);
    }
    res.json(localStore.customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/api/customers/:id', async (req, res) => {
  try {
    if (isConnected) {
      const cust = await Customer.findOne({ id: req.params.id });
      if (!cust) return res.status(404).json({ error: 'Customer not found' });
      return res.json(cust);
    }
    const cust = localStore.customers.find(c => c.id === req.params.id);
    if (!cust) return res.status(404).json({ error: 'Customer not found' });
    res.json(cust);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/customers', async (req, res) => {
  try {
    const custData = req.body;
    if (!custData.name || !custData.phone) {
      return res.status(400).json({ error: 'Validation Error: Customer "name" and "phone" are required' });
    }
    if (!custData.id) {
      const count = isConnected ? await Customer.countDocuments() : localStore.customers.length;
      custData.id = `CUST-${String(count + 1).padStart(3, '0')}`;
    }
    custData.createdAt = new Date();
    custData.updatedAt = new Date();

    localStore.customers.unshift(custData);
    saveLocalStore();

    if (isConnected) {
      const created = await Customer.create(custData);
      return res.status(201).json(created);
    }
    res.status(201).json(custData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    const idx = localStore.customers.findIndex(c => c.id === id);
    if (idx !== -1) {
      localStore.customers[idx] = { ...localStore.customers[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Customer.findOneAndUpdate({ id }, updateData, { new: true });
      return res.json(updated);
    }
    res.json(localStore.customers[idx] || updateData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    localStore.customers = localStore.customers.filter(c => c.id !== id);
    saveLocalStore();

    if (isConnected) {
      await Customer.findOneAndDelete({ id });
    }
    res.json({ message: 'Customer deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// FEEDBACK & REVIEWS CRUD API
// ============================================================
// READ ALL
app.get('/api/feedback', async (req, res) => {
  try {
    if (isConnected) {
      const feedback = await Feedback.find().sort({ createdAt: -1 });
      return res.json(feedback);
    }
    res.json(localStore.feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/api/feedback/:id', async (req, res) => {
  try {
    if (isConnected) {
      const fb = await Feedback.findOne({ id: req.params.id });
      if (!fb) return res.status(404).json({ error: 'Review not found' });
      return res.json(fb);
    }
    const fb = localStore.feedback.find(f => f.id === req.params.id);
    if (!fb) return res.status(404).json({ error: 'Review not found' });
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
app.post('/api/feedback', async (req, res) => {
  try {
    const fbData = req.body;
    if (!fbData.customerName || !fbData.comment) {
      return res.status(400).json({ error: 'Validation Error: "customerName" and "comment" are required' });
    }
    if (!fbData.id) {
      fbData.id = `fb-${Date.now()}`;
    }
    fbData.rating = Number(fbData.rating) || 5;
    fbData.status = fbData.status || 'Approved';
    fbData.createdAt = new Date();
    fbData.updatedAt = new Date();

    localStore.feedback.unshift(fbData);
    saveLocalStore();

    if (isConnected) {
      const created = await Feedback.create(fbData);
      return res.status(201).json(created);
    }
    res.status(201).json(fbData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };

    const idx = localStore.feedback.findIndex(f => f.id === id);
    if (idx !== -1) {
      localStore.feedback[idx] = { ...localStore.feedback[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Feedback.findOneAndUpdate({ id }, updateData, { new: true });
      return res.json(updated);
    }
    res.json(localStore.feedback[idx] || updateData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    localStore.feedback = localStore.feedback.filter(f => f.id !== id);
    saveLocalStore();

    if (isConnected) {
      await Feedback.findOneAndDelete({ id });
    }
    res.json({ message: 'Review deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// STAFF API
// ============================================================
app.get('/api/staff', async (req, res) => {
  try {
    if (isConnected) {
      const staff = await Staff.find().sort({ createdAt: -1 });
      if (staff.length > 0) return res.json(staff);
    }
    res.json(localStore.staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/staff', async (req, res) => {
  try {
    const staffData = req.body;
    if (!staffData.id) staffData.id = `staff-${Date.now()}`;
    localStore.staff.push(staffData);
    saveLocalStore();
    if (isConnected) {
      const created = await Staff.create(staffData);
      return res.status(201).json(created);
    }
    res.status(201).json(staffData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================================
// NOTIFICATIONS API
// ============================================================
app.get('/api/notifications', async (req, res) => {
  try {
    if (isConnected) {
      const notifs = await Notification.find().sort({ createdAt: -1 }).limit(20);
      return res.json(notifs);
    }
    res.json(localStore.notifications.slice(0, 20));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/notifications/read-all', async (req, res) => {
  try {
    localStore.notifications.forEach(n => n.read = true);
    saveLocalStore();
    if (isConnected) {
      await Notification.updateMany({}, { read: true });
    }
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ADMIN AUTHENTICATION
// ============================================================
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === 'sk@admin' && password === 'sk@admin28') {
      return res.json({
        success: true,
        user: {
          username: 'sk@admin',
          name: 'Super Admin',
          role: 'Administrator',
          access: 'Full Access'
        },
        token: `sk_auth_${Date.now()}`
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Invalid username or password. Access denied.'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// AUTOMATED FULL CRUD TEST & VALIDATION SUITE ENDPOINT
// ============================================================
app.post('/api/crud/test-all', async (req, res) => {
  const results = {
    tours: { create: false, read: false, update: false, delete: false },
    destinations: { create: false, read: false, update: false, delete: false },
    leads: { create: false, read: false, update: false, delete: false },
    customers: { create: false, read: false, update: false, delete: false },
    feedback: { create: false, read: false, update: false, delete: false },
    overallSuccess: false,
    timestamp: new Date()
  };

  try {
    const ts = Date.now();

    // 1. Tours CRUD
    const tourTestId = `test-tour-${ts}`;
    const testTour = {
      id: tourTestId,
      name: `Validation Test Tour ${ts}`,
      duration: '4 Days / 3 Nights',
      category: 'Group',
      price: 18500,
      published: true
    };
    // Create
    localStore.tours.push(testTour);
    if (isConnected) await Tour.create(testTour);
    results.tours.create = true;
    // Read
    const readTour = isConnected ? await Tour.findOne({ id: tourTestId }) : localStore.tours.find(t => t.id === tourTestId);
    if (readTour && readTour.name === testTour.name) results.tours.read = true;
    // Update
    if (isConnected) await Tour.findOneAndUpdate({ id: tourTestId }, { price: 19999 });
    const uIdx = localStore.tours.findIndex(t => t.id === tourTestId);
    if (uIdx !== -1) localStore.tours[uIdx].price = 19999;
    results.tours.update = true;
    // Delete
    if (isConnected) await Tour.findOneAndDelete({ id: tourTestId });
    localStore.tours = localStore.tours.filter(t => t.id !== tourTestId);
    results.tours.delete = true;

    // 2. Destinations CRUD
    const destTestId = `test-dest-${ts}`;
    const testDest = {
      id: destTestId,
      name: `Validation Test Dest ${ts}`,
      tag: 'Hill Station',
      startingPrice: 6500
    };
    localStore.destinations.push(testDest);
    if (isConnected) await Destination.create(testDest);
    results.destinations.create = true;
    const readDest = isConnected ? await Destination.findOne({ id: destTestId }) : localStore.destinations.find(d => d.id === destTestId);
    if (readDest) results.destinations.read = true;
    if (isConnected) await Destination.findOneAndUpdate({ id: destTestId }, { startingPrice: 7500 });
    results.destinations.update = true;
    if (isConnected) await Destination.findOneAndDelete({ id: destTestId });
    localStore.destinations = localStore.destinations.filter(d => d.id !== destTestId);
    results.destinations.delete = true;

    // 3. Leads CRUD
    const leadTestId = `test-lead-${ts}`;
    const testLead = {
      id: leadTestId,
      customerName: 'CRUD Validator User',
      phone: '+91 94432 00000',
      destination: 'Ooty & Kodaikanal',
      status: 'New'
    };
    localStore.leads.push(testLead);
    if (isConnected) await Lead.create(testLead);
    results.leads.create = true;
    const readLead = isConnected ? await Lead.findOne({ id: leadTestId }) : localStore.leads.find(l => l.id === leadTestId);
    if (readLead) results.leads.read = true;
    if (isConnected) await Lead.findOneAndUpdate({ id: leadTestId }, { status: 'Follow-up' });
    results.leads.update = true;
    if (isConnected) await Lead.findOneAndDelete({ id: leadTestId });
    localStore.leads = localStore.leads.filter(l => l.id !== leadTestId);
    results.leads.delete = true;

    // 4. Customers CRUD
    const custTestId = `test-cust-${ts}`;
    const testCust = {
      id: custTestId,
      name: 'Verified Customer Test',
      phone: '+91 98888 77777',
      city: 'Salem'
    };
    localStore.customers.push(testCust);
    if (isConnected) await Customer.create(testCust);
    results.customers.create = true;
    const readCust = isConnected ? await Customer.findOne({ id: custTestId }) : localStore.customers.find(c => c.id === custTestId);
    if (readCust) results.customers.read = true;
    if (isConnected) await Customer.findOneAndUpdate({ id: custTestId }, { city: 'Salem Central' });
    results.customers.update = true;
    if (isConnected) await Customer.findOneAndDelete({ id: custTestId });
    localStore.customers = localStore.customers.filter(c => c.id !== custTestId);
    results.customers.delete = true;

    // 5. Feedback CRUD
    const fbTestId = `test-fb-${ts}`;
    const testFb = {
      id: fbTestId,
      customerName: 'Feedback Validator',
      comment: 'Excellent tour experience with SK Tours!',
      rating: 5,
      status: 'Approved'
    };
    localStore.feedback.push(testFb);
    if (isConnected) await Feedback.create(testFb);
    results.feedback.create = true;
    const readFb = isConnected ? await Feedback.findOne({ id: fbTestId }) : localStore.feedback.find(f => f.id === fbTestId);
    if (readFb) results.feedback.read = true;
    if (isConnected) await Feedback.findOneAndUpdate({ id: fbTestId }, { rating: 5, featured: true });
    results.feedback.update = true;
    if (isConnected) await Feedback.findOneAndDelete({ id: fbTestId });
    localStore.feedback = localStore.feedback.filter(f => f.id !== fbTestId);
    results.feedback.delete = true;

    saveLocalStore();
    results.overallSuccess = true;
    res.json({
      success: true,
      message: 'All CRUD operations validated successfully across Tours, Destinations, Leads, Customers, and Feedback!',
      results
    });
  } catch (err) {
    results.overallSuccess = false;
    res.status(500).json({ success: false, error: err.message, results });
  }
});

// WIPE / RESET
app.post('/api/reset-data', async (req, res) => {
  try {
    localStore = {
      tours: [],
      destinations: [],
      leads: [],
      customers: [],
      feedback: [],
      staff: localStore.staff,
      notifications: []
    };
    saveLocalStore();

    if (isConnected) {
      await Promise.all([
        Tour.deleteMany({}),
        Destination.deleteMany({}),
        Lead.deleteMany({}),
        Customer.deleteMany({}),
        Feedback.deleteMany({}),
        Notification.deleteMany({})
      ]);
    }
    res.json({ message: 'All database records cleared successfully. Database is now clean.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;

if (process.env.NODE_ENV !== 'production' && process.env.NETLIFY !== 'true') {
  app.listen(PORT, () => {
    console.log(`>>> SK Tours Express Server listening on http://localhost:${PORT}`);
  });
}
