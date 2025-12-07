// Navbar Component
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mt-7 p-5 justify-between bg-gray-800 w-screen inline-block md:inline-flex lg:inline-flex xl:inline-flex ">
      <Link to="/">
        <h1 className="pl-5 font-bold text-gray-900 dark:text-white text-3xl sm:text-2xl">
          MOVIE SEARCH APP
        </h1>
      </Link>

      {/* Navigation Links */}
      <nav className="inline-flex">
        <Link to="/" className="p-5">
          Home
        </Link>
        <Link to="/favorites" className="p-5">
          My Favorites
        </Link>
      </nav>
    </div>
  );
}
