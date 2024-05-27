import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>
          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>
          <p className="mt-4 text-gray-500">We can't find that page.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded bg-gray-100 border-0 py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
