import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/colleges.txt");
        const text = await response.text();
        const collegeList = text.split("\n").map((college) => college.trim());
        setColleges(collegeList);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const filteredColleges = colleges.filter((college) =>
    college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="sticky text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center">
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
        <div className="md:flex-grow flex items-center justify-center relative">
          <input
            type="text"
            placeholder="Search Your College"
            className="mr-5 py-1 px-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(searchTerm.length > 0)}
            list="colleges-list"
          />
          {showDropdown && (
            <datalist
              id="colleges-list"
              className="absolute z-10 dropdown rounded overflow-hidden shadow-md border border-gray-300 bg-green-100"
            >
              {filteredColleges.map((college, index) => (
                <option
                  key={index}
                  value={college}
                  className="py-2 px-3 bg-green-300 hover:bg-green-400 cursor-pointer"
                />
              ))}
            </datalist>
          )}
        </div>
        <Link
          to="/predict"
          className="inline-flex items-center bg-green-500 border-0 py-1 px-3 mr-5 focus:outline-none hover:bg-green-400 rounded text-white mt-4 md:mt-0"
        >
          Predict College and Rank
        </Link>
        <Link
          to="/signin"
          className="inline-flex items-center bg-green-500 border-0 py-1 px-3 mr-5 focus:outline-none hover:bg-green-400 rounded text-white mt-4 md:mt-0"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
