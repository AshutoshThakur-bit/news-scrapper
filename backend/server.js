require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const scrapeHackerNews = require('./scraper/scraper');

const PORT = process.env.PORT || 5000;

const startServer = async () =>{
    try{
        await connectDB();

        // Auto scraper on server start
        await scrapeHackerNews();

        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
    }catch(error){
        console.log(error.message);
    }
}

startServer();