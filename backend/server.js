const scrape = require('./scraper/scraper');

mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{
    await scrape();
    app.listen(process.env.PORT);
});