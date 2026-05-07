const Story = require('../models/Story');

const User = require('../models/User');




// GET ALL STORIES
const getAllStories = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;




    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);




    res.status(200).json(stories);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Failed to fetch stories',
    });
  }
};




// GET SINGLE STORY
const getStoryById = async (req, res) => {

  try {

    const story = await Story.findById(
      req.params.id
    );




    if (!story) {

      return res.status(404).json({
        message: 'Story not found',
      });
    }




    res.status(200).json(story);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Failed to fetch story',
    });
  }
};




// TOGGLE BOOKMARK
const toggleBookmark = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );




    const storyId = req.params.id;

    const isBookmarked =
      user.bookmarks.includes(storyId);




    if (isBookmarked) {

      user.bookmarks =
        user.bookmarks.filter(
          (id) => id.toString() !== storyId
        );

    } else {

      user.bookmarks.push(storyId);
    }




    await user.save();




    res.status(200).json({
      bookmarks: user.bookmarks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Bookmark failed',
    });
  }
};




module.exports = {
  getAllStories,
  getStoryById,
  toggleBookmark,
};