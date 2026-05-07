const express = require('express');
const cors = require('cors');

const app = express();




// CORS CONFIG
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);




// BODY PARSER
app.use(express.json());




// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/stories', require('./routes/storyRoutes'));

app.use('/api/scrape', require('./routes/scrapeRoutes'));




// TEST ROUTE
app.get('/', (req, res) => {
  res.send('API Running...');
});

module.exports = app;