const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Product = require("./model/Product");
const productRoutes = require('./routes/productRoutes');
const {connectRabbitMQ, consumeMessage} = require('./utils/rabbitMQ');
connectDB();

const app = express();
const PORT = 3000

app.use(express.json());
app.use('/api/products', productRoutes);

async function processOrder(order) {
  console.log("Product service received order:", order);
  for(let item of order.products) {
    const product = await Product.findById(item.productId);
    if(!product) {
      continue;
    }
    product.stock -= item.quantity;
    await product.save();
    console.log(`Updated stock for product ${product.name}: ${product.stock}`);
  }
}

app.get('/', (req, res) => {
  res.send('Product Services is running')
})


app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});
(async () => {
  await connectRabbitMQ();
  consumeMessage('productQueue', processOrder);
})();