import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="font-bold text-xl"
      >
        HN Scraper
      </Link>





      <div className="flex gap-4 items-center">

        {
          user ? (
            <>

              <Link to="/bookmarks">
                Bookmarks
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-1 rounded"
              >
                Logout
              </button>

            </>
          ) : (
            <>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
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