const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/scrape', require('./scraper/scraper'));

module.exports = app;