import React from "react";

const CollegeCard = ({ college }) => {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div className="border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src={college.logo}
            alt={college.name}
            className="w-10 h-10 mr-4"
          />
          <h2 className="text-lg text-gray-900 font-medium title-font">
            {college.name}
          </h2>
        </div>
        <p className="leading-relaxed text-base">{college.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">Rating:</span>
          <span className="text-gray-600">Reviews:</span>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
