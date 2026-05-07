const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        // Fetch Hacker News homepage
        const { data } = await axios.get('https://news.ycombinator.com');

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        const stories = [];

        // Loop through stories
        $('.athing').each((i, el) => {
            // Only top 10 stories
            if (i >= 10) return false;

            const title = $(el).find('.titleline a').text();
            const url = $(el).find('.titleline a').attr('href');

            // Next row contains subtext
            const subtext = $(el).next().find('.subtext');

            const points = parseInt(subtext.find('.score').text()) || 0;

            const author = subtext.find('.hnuser').text();

            const postedAt = subtext.find('.age').text();

            stories.push({
                title,
                url,
                points,
                author,
                postedAt,
            });
        });

        // Clear old data
        await Story.deleteMany({});

        // Insert new data
        await Story.insertMany(stories);

        console.log('Scraped & saved successfully');
    } catch (error) {
        console.error('Scraping error:', error.message);
    }
};

module.exports = scrapeHackerNews;