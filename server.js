const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());


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


const Article = mongoose.model('Data', {
 
    heading: String,
    p: String,
    image: String,
  category: String,
 
  });

app.post('/api/datas', async (req, res) => {
    try {
      const datas = await Article.find();
      res.json(datas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

const port = process.env.PORT || 8014;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
