const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://knagasamanvitha:react-portfolio@cluster0.t7nlahy.mongodb.net/portfolio_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const portfolioSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  image: String,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

app.post('/api/portfolio', async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();
    res.status(201).send(newPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});