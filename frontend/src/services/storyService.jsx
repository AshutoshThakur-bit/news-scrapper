import API from './api';

//GET ALL STORIES
export const getStories = async (page = 1, limit = 10) =>{

    const response = await API.get(
        `/stories?page=${page}&limit=${limit}`
    );
    return response.data;
};


// GET SINGLE STORY
export const getStoryById = async(id) => {

    const response = await API.get(
        `/stories/${id}`
    );
    return response.data;
};

// TOGGLE BOOKMARK
export const toggleBookmark = async (id) =>{
    
    const response = await API.post(
        `/stories/${id}/bookmark`
    );
    return response.data;
};