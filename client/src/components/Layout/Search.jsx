import React, { useState, useEffect } from "react";

const Search = ({ placeholder, value, onChange }) => {
  const [colleges, setColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState([]);

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

  useEffect(() => {
    if (colleges) {
      const filtered = colleges.filter((college) =>
        college.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  }, [value, colleges]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    onChange(value);
    setShowDropdown(value.length > 0);
  };

  return (
    <div className="relative w-full md:w-1/3 lg:w-1/4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 shadow-md"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(value.length > 0)}
        list="colleges-list"
      />
      {showDropdown && (
        <datalist
          id="colleges-list"
          className="absolute z-10 w-full mt-1 rounded-lg overflow-hidden shadow-md border border-gray-300 bg-white"
        >
          {filteredColleges.map((college, index) => (
            <option
              key={index}
              value={college}
              className="py-2 px-3 hover:bg-green-100 cursor-pointer"
            />
          ))}
        </datalist>
      )}
    </div>
  );
};

export default Search;
