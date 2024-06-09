import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <header className="sticky text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            color="#000000"
            fill="none"
            className="w-15 h-15 text-white p-2"
          >
            <path
              d="M12 2L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(0, 255, 0, 0.7)"
            />
          </svg>
          <span className="ml-3 text-xl">StudentSays</span>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user.isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center bg-green-500 border-0 py-1 px-3 mr-5 focus:outline-none hover:bg-green-400 rounded text-white mt-4 md:mt-0"
            >
              Admin
            </Link>
          )}
          {isLoggedIn ? (
            <Link
              to="/logout"
              className="inline-flex items-center bg-green-500 border-0 py-1 px-3 mr-5 focus:outline-none hover:bg-green-400 rounded text-white mt-4 md:mt-0"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/signin"
              className="inline-flex items-center bg-green-500 border-0 py-1 px-3 mr-5 focus:outline-none hover:bg-green-400 rounded text-white mt-4 md:mt-0"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
