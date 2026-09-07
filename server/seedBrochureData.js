import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { INITIAL_TOURS, INITIAL_DESTINATIONS } from '../src/data/mockData.js';
import Tour from './models/Tour.js';
import Destination from './models/Destination.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'data', 'db_store.json');

async function seed() {
  console.log(`Starting brochure database sync with ${INITIAL_TOURS.length} Tours and ${INITIAL_DESTINATIONS.length} Destinations...`);

  // 1. Update local db_store.json
  let dbStore = {
    tours: [],
    destinations: [],
    leads: [],
    customers: [],
    feedback: [],
    staff: [],
    notifications: []
  };

  if (fs.existsSync(STORE_PATH)) {
    try {
      dbStore = JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
    } catch (e) {
      console.warn('Could not parse existing db_store.json:', e.message);
    }
  }

  // Update tours and destinations
  dbStore.tours = INITIAL_TOURS;
  dbStore.destinations = INITIAL_DESTINATIONS;

  fs.writeFileSync(STORE_PATH, JSON.stringify(dbStore, null, 2), 'utf-8');
  console.log(`✓ Successfully updated ${STORE_PATH} with all ${INITIAL_TOURS.length} tours and ${INITIAL_DESTINATIONS.length} destinations.`);

  // 2. Try syncing to MongoDB Atlas if reachable
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_SRV_URI || '';
  try {
    console.log('Connecting to MongoDB Atlas to seed live collections...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 6000 });
    console.log('Connected to Atlas! Upserting tours & destinations...');

    // Remove any old/dummy tours not in the official 22 brochure catalog
    const validTourIds = INITIAL_TOURS.map(t => t.id);
    const deletedRes = await Tour.deleteMany({ id: { $nin: validTourIds } });
    if (deletedRes.deletedCount > 0) {
      console.log(`✓ Cleaned up ${deletedRes.deletedCount} outdated tours from Atlas.`);
    }

    for (const tour of INITIAL_TOURS) {
      await Tour.findOneAndUpdate({ id: tour.id }, tour, { upsert: true, returnDocument: 'after' });
    }
    console.log(`✓ Upserted ${INITIAL_TOURS.length} tours to Atlas.`);

    const validDestIds = INITIAL_DESTINATIONS.map(d => d.id);
    await Destination.deleteMany({ id: { $nin: validDestIds } });

    for (const dest of INITIAL_DESTINATIONS) {
      await Destination.findOneAndUpdate({ id: dest.id }, dest, { upsert: true, returnDocument: 'after' });
    }
    console.log(`✓ Upserted ${INITIAL_DESTINATIONS.length} destinations to Atlas.`);

    await mongoose.disconnect();
    console.log('Atlas sync finished cleanly.');
  } catch (err) {
    console.log('Atlas connection notice (local store is 100% active and up to date):', err.message);
  }

  console.log('Seeding completed successfully!');
}

seed();
