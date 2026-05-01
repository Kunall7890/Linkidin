// scripts/test-db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not found in environment');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('OK - connected to MongoDB');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('CONNECT ERROR');
    console.error(err);
    process.exit(1);
  }
})();
