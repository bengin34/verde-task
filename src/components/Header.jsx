import React, { useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { RiApps2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = ({ cardData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="dark">
      <nav className=" shadow border-gray-200 px-2 sm:px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Arbit Blog
            </span>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            } `}
            id="navbar-default"
          >
            <ul className="flex flex-col items-center p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 relative text-xl"
                  aria-current="page" 
                >
                  Posts
                  <div
                    className="rounded-full bg-slate-700 text-green-300 p-3 flex justify-center items-center text-sm"
                    style={{
                      width: "1.125rem",
                      height: "1.125rem",
                      position: "absolute",
                      top: "-12px",
                      right: "-22px",
                    }}
                  >
                    {cardData.length}
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-xl"
                >
                  <BsFillBellFill />
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-xl"
                >
                  <RiApps2Fill />
                </Link>
              </li>
              <li>
                <img
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg"
                  alt="Bordered avatar"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
