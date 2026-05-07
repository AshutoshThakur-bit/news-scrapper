import { useEffect, useState } from 'react';

import StoryCard from '../components/StoryCard';

import {
    getStories,
    toggleBookmark,
} from '../services/storyService';

import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {

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

            const bookmarkedStories = data.filter(
                (story) =>
                    user?.bookmarks?.includes(story._id)
            );

            setStories(bookmarkedStories);

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



            setStories((prev) =>
                prev.filter(
                    (story) => story._id !== storyId
                )
            );

        } catch (error) {

            console.log(error);
        }
    };




    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">

                <div className="text-xl font-semibold animate-pulse">
                    Loading bookmarks...
                </div>

            </div>
        );
    }




    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Bookmarks
            </h1>




            {
                stories.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        No bookmarked stories yet
                    </div>
                ) : (
                    stories.map((story) => (

                        <StoryCard
                            key={story._id}
                            story={story}
                            onBookmark={handleBookmark}
                            bookmarked={true}
                        />

                    ))
                )
            }

        </div>
    );
};

export default Bookmarks;