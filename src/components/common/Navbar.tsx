import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBus, FaUserCog } from "react-icons/fa";
import { MdEventSeat, MdMenu, MdClose } from "react-icons/md";
import { BiReset } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${
          isActivePath(to)
            ? "text-blue-600 bg-blue-50 shadow-sm"
            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FaBus className="h-6 w-6" />
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                Selise Bus
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/">
              <MdEventSeat className="h-5 w-5" />
              <span>Book Seat</span>
            </NavLink>
            <NavLink to="/admin">
              <FaUserCog className="h-5 w-5" />
              <span>Admin</span>
            </NavLink>
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={handleClearData}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <BiReset className="h-5 w-5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <MdClose className="block h-6 w-6" />
              ) : (
                <MdMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>


      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          isMenuOpen
            ? "max-h-48 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActivePath("/")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
          >
            <MdEventSeat className="h-5 w-5" />
            <span>Book Seat</span>
          </Link>
          <Link
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActivePath("/admin")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
          >
            <FaUserCog className="h-5 w-5" />
            <span>Admin</span>
          </Link>
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={handleClearData}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <BiReset className="h-5 w-5" />
              <span>Reset Data</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
