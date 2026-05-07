import { useAuth } from '../context/AuthContext';

const StoryCard = ({
  story,
  onBookmark,
  bookmarked,
}) => {

  const { user } = useAuth();




  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-4">

      <div className="flex justify-between items-start gap-4">

        <div>

          <a
            href={story.url}
            target="_blank"
            rel="noreferrer"
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {story.title}
          </a>




          <div className="mt-2 text-gray-600 text-sm">

            <p>
              Points:
              <span className="font-medium ml-1">
                {story.points}
              </span>
            </p>

            <p>
              Author:
              <span className="font-medium ml-1">
                {story.author}
              </span>
            </p>

            <p>
              Posted:
              <span className="font-medium ml-1">
                {story.postedAt}
              </span>
            </p>

          </div>

        </div>





        {
          user && (
            <button
              onClick={() => onBookmark(story._id)}
              className={`px-4 py-2 rounded text-white ${
                bookmarked
                  ? 'bg-red-500'
                  : 'bg-black'
              }`}
            >
              {
                bookmarked
                  ? 'Remove'
                  : 'Bookmark'
              }
            </button>
          )
        }

      </div>

    </div>
  );
};

export default StoryCard;