const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = 3000

const authRoutes = require('./routes')
const connectDb = require('./config/db')

connectDb();

app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('User Services is running')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})  