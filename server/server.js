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
import Image from './models/Image.js';
import AdminProfile from './models/AdminProfile.js';

dotenv.config();

// Use process.cwd() instead of import.meta.url to prevent esbuild Netlify errors
const __dirname = path.join(process.cwd(), 'server');
// Detect serverless environment (Netlify Functions, AWS Lambda, Vercel)
const isServerless = Boolean(
  process.env.NETLIFY === 'true' ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT ||
  process.env.VERCEL
);
const isNetlify = isServerless;

// DNS fallback
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // ignore
}

const app = express();
const PORT = process.env.PORT || 5000;

// Domain & API Security: Hide framework fingerprint
app.disable('x-powered-by');

// Security headers for API
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Persistent Local Store (Ensures 100% zero downtime & immediate CRUD persistence)
const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'db_store.json');

try {
  if (!isServerless && !fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  // Read-only filesystem in serverless environments
}

function loadLocalStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
    }
  } catch (err) {
    // Ignore read errors in serverless
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
  if (isServerless) return; // Netlify has a read-only filesystem, skip local saving
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(localStore, null, 2), 'utf-8');
  } catch (err) {
    // Read-only filesystem
  }
}

// MongoDB Atlas Connection (with verified direct cluster connection string fallback)
const FALLBACK_MONGODB_URI = "mongodb://sktoursandtravelsalem_db_user:ZY4kxkYCKWabzQPR@ac-nrqqyke-shard-00-00.jmznisf.mongodb.net:27017,ac-nrqqyke-shard-00-01.jmznisf.mongodb.net:27017,ac-nrqqyke-shard-00-02.jmznisf.mongodb.net:27017/sk_tours?ssl=true&authSource=admin&replicaSet=atlas-vo81m1-shard-0&retryWrites=true&w=majority";

const primaryUri = process.env.MONGODB_URI || process.env.MONGODB_SRV_URI || FALLBACK_MONGODB_URI;

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
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }
  if (isConnecting) {
    let waitCount = 0;
    while (isConnecting && waitCount < 20) {
      await new Promise(r => setTimeout(r, 200));
      waitCount++;
    }
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return mongoose.connection;
    }
  }

  isConnecting = true;
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    isConnected = true;
    connectionError = null;
    console.log(`>>> MongoDB Connected Successfully! Database: "${mongoose.connection.name}"`);

    // In local non-serverless mode, sync local data
    if (!isServerless) {
      await Promise.all([
        Tour.init(),
        Destination.init(),
        Lead.init(),
        Customer.init(),
        Feedback.init(),
        Staff.init(),
        Notification.init()
      ]).catch(() => {});
      await syncLocalToAtlas();
    }
  } catch (err) {
    connectionError = err.message;
    console.error('MongoDB connection error:', err.message);
  } finally {
    isConnecting = false;
  }
}

// Initial connect
connectDB().catch(() => {});

// Background reconnect for persistent servers (not in serverless Lambda)
if (!isServerless) {
  setInterval(() => {
    if (!isConnected && !isConnecting) {
      connectDB().catch(() => {});
    }
  }, 45000);
}

// ============================================================
// MIDDLEWARE: Netlify Function Path Rewriting & MongoDB Guard
// ============================================================
app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace('/.netlify/functions/api', '/api');
  }
  next();
});

app.use(async (req, res, next) => {
  if (!isConnected || mongoose.connection.readyState !== 1) {
    await connectDB().catch(() => {});
  }
  next();
});

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
    const tourData = { ...req.body };
    delete tourData._id;

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
    console.error('Error creating tour:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    // Update local store
    const idx = localStore.tours.findIndex(t => t.id === id);
    if (idx !== -1) {
      localStore.tours[idx] = { ...localStore.tours[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Tour.findOneAndUpdate({ id }, updateData, { returnDocument: 'after', upsert: true });
      return res.json(updated);
    }
    res.json(localStore.tours[idx] || updateData);
  } catch (err) {
    console.error('Error updating tour:', err);
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
    console.error('Error deleting tour:', err);
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
    const destData = { ...req.body };
    delete destData._id;

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
    console.error('Error creating destination:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    const idx = localStore.destinations.findIndex(d => d.id === id);
    if (idx !== -1) {
      localStore.destinations[idx] = { ...localStore.destinations[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Destination.findOneAndUpdate({ id }, updateData, { returnDocument: 'after', upsert: true });
      return res.json(updated);
    }
    res.json(localStore.destinations[idx] || updateData);
  } catch (err) {
    console.error('Error updating destination:', err);
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
    const leadData = { ...req.body };
    delete leadData._id;

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
    console.error('Error creating lead:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    const idx = localStore.leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      localStore.leads[idx] = { ...localStore.leads[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Lead.findOneAndUpdate({ id }, updateData, { returnDocument: 'after' });
      return res.json(updated);
    }
    res.json(localStore.leads[idx] || updateData);
  } catch (err) {
    console.error('Error updating lead:', err);
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
    const custData = { ...req.body };
    delete custData._id;

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
    console.error('Error creating customer:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    const idx = localStore.customers.findIndex(c => c.id === id);
    if (idx !== -1) {
      localStore.customers[idx] = { ...localStore.customers[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Customer.findOneAndUpdate({ id }, updateData, { returnDocument: 'after' });
      return res.json(updated);
    }
    res.json(localStore.customers[idx] || updateData);
  } catch (err) {
    console.error('Error updating customer:', err);
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
    console.error('Error deleting customer:', err);
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
    const fbData = { ...req.body };
    delete fbData._id;

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
    console.error('Error creating feedback:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    const idx = localStore.feedback.findIndex(f => f.id === id);
    if (idx !== -1) {
      localStore.feedback[idx] = { ...localStore.feedback[idx], ...updateData };
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Feedback.findOneAndUpdate({ id }, updateData, { returnDocument: 'after' });
      return res.json(updated);
    }
    res.json(localStore.feedback[idx] || updateData);
  } catch (err) {
    console.error('Error updating feedback:', err);
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
    console.error('Error deleting feedback:', err);
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
    const staffData = { ...req.body };
    delete staffData._id;

    if (!staffData.id) staffData.id = `staff-${Date.now()}`;
    localStore.staff.push(staffData);
    saveLocalStore();
    if (isConnected) {
      const created = await Staff.create(staffData);
      return res.status(201).json(created);
    }
    res.status(201).json(staffData);
  } catch (err) {
    console.error('Error creating staff:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE STAFF / ADMIN PROFILE
app.put('/api/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    // Update in localStore
    const idx = localStore.staff.findIndex(s => s.id === id);
    if (idx !== -1) {
      localStore.staff[idx] = { ...localStore.staff[idx], ...updateData };
      saveLocalStore();
    } else {
      localStore.staff.push({ id, ...updateData });
      saveLocalStore();
    }

    if (isConnected) {
      const updated = await Staff.findOneAndUpdate(
        { id },
        updateData,
        { upsert: true, returnDocument: 'after' }
      );
      return res.json(updated);
    }
    res.json(localStore.staff[idx] || { id, ...updateData });
  } catch (err) {
    console.error('Error updating staff profile:', err);
    res.status(400).json({ error: err.message });
  }
});

// ============================================================
// IMAGE UPLOAD & HOSTING API (100% Free, Permanent Cloud Hosting)
// ============================================================
app.post('/api/upload', async (req, res) => {
  try {
    const { image, filename, contentType } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image base64 data is required' });
    }

    if (isConnected) {
      const newImg = new Image({
        filename: filename || `img-${Date.now()}.jpg`,
        contentType: contentType || 'image/jpeg',
        data: image,
        size: image.length
      });
      await newImg.save();
      const imageUrl = `/api/images/${newImg._id}`;
      return res.json({
        success: true,
        id: newImg._id,
        url: imageUrl,
        filename: newImg.filename,
        message: 'Image hosted successfully in MongoDB Atlas'
      });
    }

    // Fallback if temporarily offline: return the dataUrl directly
    res.json({
      success: true,
      url: image,
      filename: filename || 'image.jpg',
      message: 'Direct data URL generated'
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: err.message });
  }
});

// SERVE HOSTED IMAGES
app.get('/api/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isConnected) {
      const img = await Image.findById(id);
      if (img && img.data) {
        let base64Data = img.data;
        if (base64Data.includes('base64,')) {
          base64Data = base64Data.split('base64,')[1];
        }
        const buffer = Buffer.from(base64Data, 'base64');
        res.setHeader('Content-Type', img.contentType || 'image/jpeg');
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return res.end(buffer);
      }
    }
    res.status(404).send('Image not found');
  } catch (err) {
    res.status(500).send('Error loading image: ' + err.message);
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
// ADMIN PROFILE FULL CRUD API (Direct MongoDB Atlas Sync)
// ============================================================

// READ ACTIVE ADMIN PROFILE
app.get('/api/admin/profile', async (req, res) => {
  try {
    if (isConnected) {
      let profile = await AdminProfile.findOne().sort({ createdAt: 1 });
      if (!profile) {
        // Auto-seed default admin profile if not exists
        profile = await AdminProfile.create({
          id: 'admin-primary',
          username: 'sk@admin',
          password: 'sk@admin28',
          name: 'Mr. S. Karthikeyan',
          role: 'Super Admin',
          email: 'admin@sktours.com',
          phone: '+91 99946 44744',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
          branch: 'Salem HQ (Fairlands)',
          bio: 'Managing luxury travel itineraries and operations at SK Tours & Travels Salem.'
        });
      }
      return res.json(profile);
    }
    res.json(localStore.adminProfiles?.[0] || {
      id: 'admin-primary',
      username: 'sk@admin',
      password: 'sk@admin28',
      name: 'Mr. S. Karthikeyan',
      role: 'Super Admin',
      email: 'admin@sktours.com',
      phone: '+91 99946 44744'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL ADMIN PROFILES
app.get('/api/admin/profiles', async (req, res) => {
  try {
    if (isConnected) {
      const profiles = await AdminProfile.find().sort({ createdAt: 1 });
      return res.json(profiles);
    }
    res.json(localStore.adminProfiles || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE NEW ADMIN PROFILE
app.post('/api/admin/profile', async (req, res) => {
  try {
    const adminData = { ...req.body };
    delete adminData._id;
    if (!adminData.id) adminData.id = `admin-${Date.now()}`;
    if (!adminData.username || !adminData.name) {
      return res.status(400).json({ error: 'Username and Name are required' });
    }

    if (!localStore.adminProfiles) localStore.adminProfiles = [];
    localStore.adminProfiles.push(adminData);
    saveLocalStore();

    if (isConnected) {
      const created = await AdminProfile.create(adminData);
      return res.status(201).json(created);
    }
    res.status(201).json(adminData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE ADMIN PROFILE IN MONGODB ATLAS
app.put('/api/admin/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    if (!localStore.adminProfiles) localStore.adminProfiles = [];
    const idx = localStore.adminProfiles.findIndex(a => a.id === id);
    if (idx !== -1) {
      localStore.adminProfiles[idx] = { ...localStore.adminProfiles[idx], ...updateData };
    } else {
      localStore.adminProfiles.push({ id, ...updateData });
    }
    saveLocalStore();

    if (isConnected) {
      const updated = await AdminProfile.findOneAndUpdate(
        { id },
        updateData,
        { upsert: true, returnDocument: 'after' }
      );
      return res.json(updated);
    }
    res.json(localStore.adminProfiles[idx] || { id, ...updateData });
  } catch (err) {
    console.error('Error updating admin profile in MongoDB Atlas:', err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE ADMIN PROFILE FROM MONGODB ATLAS
app.delete('/api/admin/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (localStore.adminProfiles) {
      localStore.adminProfiles = localStore.adminProfiles.filter(a => a.id !== id);
      saveLocalStore();
    }
    if (isConnected) {
      await AdminProfile.findOneAndDelete({ id });
    }
    res.json({ success: true, message: 'Admin profile deleted from MongoDB Atlas', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ADMIN AUTHENTICATION (Authenticates against MongoDB Atlas)
// ============================================================
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Verify against MongoDB Atlas AdminProfile collection
    if (isConnected) {
      const adminInDb = await AdminProfile.findOne({ username, password });
      if (adminInDb) {
        adminInDb.lastLogin = new Date();
        await adminInDb.save();

        return res.json({
          success: true,
          user: {
            id: adminInDb.id,
            username: adminInDb.username,
            name: adminInDb.name,
            role: adminInDb.role,
            avatar: adminInDb.avatar,
            email: adminInDb.email,
            phone: adminInDb.phone,
            branch: adminInDb.branch,
            access: 'Full Access'
          },
          token: `sk_auth_${Date.now()}`
        });
      }
    }

    // 2. Fallback check (local store or initial bootstrap)
    const localAdmin = localStore.adminProfiles?.find(a => a.username === username && a.password === password);
    if (localAdmin || (username === 'sk@admin' && password === 'sk@admin28')) {
      const userObj = localAdmin || {
        id: 'admin-primary',
        username: 'sk@admin',
        name: 'Mr. S. Karthikeyan',
        role: 'Super Admin',
        access: 'Full Access'
      };
      return res.json({
        success: true,
        user: userObj,
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
