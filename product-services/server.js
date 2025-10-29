const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
const PORT = 3000

app.use(express.json());
app.use('/api/producrs', productRoutes);

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});