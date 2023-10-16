const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const url = "mongodb+srv://root:root@testing.svxbinm.mongodb.net/Article";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for the "Data" collection
const Article = mongoose.model('Data', {
    // Define your schema for the "datas" collection
    heading: String,
    p: String,
    image: String,
  category: String,
    // Add more fields as needed
  });
// Create a model for the "Data" collection based on the schema
app.post('/api/datas', async (req, res) => {
    try {
      const datas = await Article.find();
      res.json(datas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Start the server
const port = process.env.PORT || 8014;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
