import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();




  const handleLogout = () => {

    logout();

    navigate('/login');
  };




  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">

      <Link
        to="/"
        className="font-bold text-2xl"
      >
        HN Scraper
      </Link>





      <div className="flex items-center gap-4">

        {
          user ? (
            <>

              <span className="hidden md:block text-gray-300">
                Hello,
                <span className="ml-1 font-semibold">
                  {user.name}
                </span>
              </span>




              <Link
                to="/bookmarks"
                className="hover:text-gray-300"
              >
                Bookmarks
              </Link>




              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>

            </>
          ) : (
            <>

              <Link
                to="/login"
                className="hover:text-gray-300"
              >
                Login
              </Link>




              <Link
                to="/register"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
              >
                Register
              </Link>

            </>
          )
        }

      </div>

    </nav>
  );
};

export default Navbar;