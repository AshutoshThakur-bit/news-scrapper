const router = require('express').Router();
const scrape = require('../scraper/scraper');

router.post('/', async (req, res)=>{
    await scrape();
    res.json({message: "Scraped successfully"});
});

module.exports = router;