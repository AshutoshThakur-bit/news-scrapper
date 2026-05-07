require('dotenv').config();

const app = require('./app');

const connectDB = require('./config/db');

const scrapeHackerNews = require('./scraper/scraper');

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  try {

    await connectDB();




    // Safe scraper execution
    try {

      await scrapeHackerNews();

    } catch (scrapeError) {

      console.log(
        'Scraper Error:',
        scrapeError.message
      );
    }




    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  } catch (error) {

    console.log(error.message);
  }
};

startServer();