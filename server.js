const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple schema and model
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: String,
});
const Item = mongoose.model('Item', ItemSchema);

// Create a route to add an item
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).send(newItem);
});

// Create a route to get all items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.status(200).send(items);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); });
