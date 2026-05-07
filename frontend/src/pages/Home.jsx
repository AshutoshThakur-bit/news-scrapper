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

    const [page, setPage] = useState(1);

    const {
        user,
        setUser,
    } = useAuth();

    useEffect(() => {

        fetchStories();

    }, [page]);

    const fetchStories = async () => {

        try {

            setLoading(true);

            const data = await getStories(page, 10);

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
            <div className="flex justify-center items-center h-[60vh]">

                <div className="text-xl font-semibold animate-pulse">
                    Loading stories...
                </div>

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
                    <div className="text-center text-gray-500 mt-10"
                    >No stories found</div>
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

            <div className="flex justify-center gap-4 mt-8">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    Previous
                </button>

                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default Home;