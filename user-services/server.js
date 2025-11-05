const express = require('express')
const logger = require('./utils/logger');
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = 3000

const authRoutes = require('./routes/authRoutes')
const {connectRabbitMQ, consumeMessage} = require('./utils/rabbitMQ');
const connectDb = require('./config/db')

connectDb();

app.use(express.json())
async function notifyUser(order) {
  logger.info(`User service received order: ${JSON.stringify(order)}`);
  // Mail to user
}
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('User Services is running')
})
app.listen(PORT, () => {
  logger.info(`User service is running on port ${PORT}`);
});

(async () => {
  await connectRabbitMQ();
  consumeMessage('userQueue', notifyUser);
})();
