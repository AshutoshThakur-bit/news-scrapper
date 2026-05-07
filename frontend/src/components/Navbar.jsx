import { Link } from "react-router-dom"

const Navbar = () =>{
    return(
        <nav className="bg-black text-white px-6 py-4 flex justify-between">
            
            <Link to="/" className="font-bold text-xl">
                HN Scraper
            </Link>

            <div className="flex gap-4">

                <Link to="/login">
                 Login
                </Link>

                <Link to="/register">
                 Register
                </Link>

                <Link to="/bookmarks">
                 Bookmarks
                </Link>


            </div>
        </nav>
    )

}

export default Navbar;