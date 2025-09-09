const mongoose = require('mongoose')
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = require('../utils/config');
const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB_NAME}?authSource=admin`;


export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

module.exports = {
  connectDb
}
