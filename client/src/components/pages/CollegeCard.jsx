import React from "react";
import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const getTruncatedDescription = (description) => {
    const words = description.split(" ");
    return words.length > 15
      ? words.slice(0, 15).join(" ") + "..."
      : description;
  };

  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <Link to={`/colleges/${college._id}`}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src={`http://localhost:5000${college.logo}`}
              alt={college.name}
              className="w-24 h-auto mr-4"
            />
            <h2 className="text-lg text-gray-900 font-medium title-font">
              {college.name}
            </h2>
          </div>
          <p className="leading-relaxed text-base">
            {getTruncatedDescription(college.description)}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">
              Rating: {college.averageRating}
            </span>
            <span className="text-gray-600">
              Reviews: {college.reviews.length}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CollegeCard;
