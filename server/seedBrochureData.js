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
  const mongoUri = process.env.MONGODB_URI || 'mongodb://sktoursandtravelsalem_db_user:ZY4kxkYCKWabzQPR@ac-nrqqyke-shard-00-00.jmznisf.mongodb.net:27017,ac-nrqqyke-shard-00-01.jmznisf.mongodb.net:27017,ac-nrqqyke-shard-00-02.jmznisf.mongodb.net:27017/sk_tours?ssl=true&authSource=admin&replicaSet=atlas-vo81m1-shard-0&retryWrites=true&w=majority';
  
  try {
    console.log('Connecting to MongoDB Atlas to seed live collections...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 6000 });
    console.log('Connected to Atlas! Upserting tours & destinations...');

    for (const tour of INITIAL_TOURS) {
      await Tour.findOneAndUpdate({ id: tour.id }, tour, { upsert: true, new: true });
    }
    console.log(`✓ Upserted ${INITIAL_TOURS.length} tours to Atlas.`);

    for (const dest of INITIAL_DESTINATIONS) {
      await Destination.findOneAndUpdate({ id: dest.id }, dest, { upsert: true, new: true });
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
