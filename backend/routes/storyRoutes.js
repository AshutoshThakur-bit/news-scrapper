const express = require('express');

const router = express.Router();

const {
  getAllStories,
  getStoryById,
  toggleBookmark,
} = require('../controllers/storyController');

const authMiddleware = require('../middleware/authMiddleware');




// GET STORIES
router.get('/', getAllStories);




// GET SINGLE STORY
router.get('/:id', getStoryById);




// BOOKMARK
router.post(
  '/:id/bookmark',
  authMiddleware,
  toggleBookmark
);

module.exports = router;