const express = require('express')
const app = express()
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config");

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

app.get('/', (req, res) => {
  res.send("<h1>Hello world using express</h1>")
})

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Successfully connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log(`Server started on PORT: ${PORT}`);
})