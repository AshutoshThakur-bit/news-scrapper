import { useEffect, useState } from 'react';

import StoryCard from '../components/StoryCard';

import {
  getStories,
  toggleBookmark,
} from '../services/storyService';

import { useAuth } from '../context/AuthContext';

const Home = () => {

  const [stories, setStories] = useState([]);

  const [loading, setLoading] = useState(true);




  const {
    user,
    setUser,
  } = useAuth();




  useEffect(() => {

    fetchStories();

  }, []);




  const fetchStories = async () => {

    try {

      const data = await getStories();

      setStories(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };




  const handleBookmark = async (storyId) => {

    try {

      const data = await toggleBookmark(storyId);

      const updatedUser = {
        ...user,
        bookmarks: data.bookmarks,
      };

      setUser(updatedUser);

      localStorage.setItem(
        'user',
        JSON.stringify(updatedUser)
      );

    } catch (error) {

      console.log(error);
    }
  };




  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading stories...
      </div>
    );
  }




  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Top Hacker News Stories
      </h1>




      {
        stories.length === 0 ? (
          <div>No stories found</div>
        ) : (
          stories.map((story) => (

            <StoryCard
              key={story._id}
              story={story}
              onBookmark={handleBookmark}
              bookmarked={
                user?.bookmarks?.includes(story._id)
              }
            />

          ))
        )
      }

    </div>
  );
};

export default Home;