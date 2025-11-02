const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DB_NAME } = require('../utils/config');
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

module.exports = connectDb
