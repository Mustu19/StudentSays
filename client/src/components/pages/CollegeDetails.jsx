import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { toast } from "react-toastify";

const CollegeDetails = () => {
  const { id } = useParams();
  const { API, user } = useAuth();
  const [college, setCollege] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollegeAndReviews();
  }, [API, id]);

  const fetchCollegeAndReviews = async () => {
    try {
      const collegeResponse = await fetch(`${API}/api/colleges/${id}`);
      const collegeData = await collegeResponse.json();
      if (collegeResponse.ok) {
        setCollege(collegeData);
      } else {
        toast.error(collegeData.message);
      }

      const reviewsResponse = await fetch(`${API}/api/reviews/${id}/reviews`);
      const reviewsData = await reviewsResponse.json();
      if (reviewsResponse.ok) {
        setReviews(reviewsData);
      } else {
        toast.error(reviewsData.message);
      }
    } catch (error) {
      toast.error("Failed to fetch college details and reviews");
    }
  };

  const handleAddReview = () => {
    if (!user) {
      navigate("/signin");
    } else {
      setShowReviewForm(true);
    }
  };

  const handleReviewSubmit = (newReview) => {
    console.log("handleReviewSubmit triggered with:", newReview);
    setReviews((prev) => [...prev, newReview]);
    fetchCollegeAndReviews();
  };

  if (!college) return <p>Loading...</p>;

  const renderStarRow = (rating, label, color) => (
    <div className="flex items-center mt-2 text-lg text-gray-600">
      <svg className={`w-5 h-5 mr-1 fill-current ${color}`} viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 0l2.56 6.81L20 7.35l-5.45 4.5L17.6 20 10 15.77 2.4 20 4.85 11.85 0 7.35l7.44-.54L10 0z"
        />
      </svg>
      <span className="text-base">
        {rating} {label}
      </span>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
        <div className="flex flex-col items-center lg:items-start lg:w-2/3">
          <img
            src={`http://localhost:5000${college.logo}`}
            alt={college.name}
            className="w-48 h-48 mb-4"
          />
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {college.name}
          </h2>
          <h4 className="text-lg text-gray-700 mb-4">{college.description}</h4>
          <h5 className="text-xl text-blue-500 mb-4">
            <a
              href={`https://${college.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit College Website
            </a>
          </h5>
          <div className="flex flex-col text-xl text-gray-600">
            <span className="mb-2">
              Rating: {college.averageRating.toFixed(2)}
            </span>
            <span>Reviews: {reviews.length}</span>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/3">
          {renderStarRow(5, "Excellent", "text-green-800")}
          {renderStarRow(4, "Good", "text-green-500")}
          {renderStarRow(3, "Average", "text-yellow-500")}
          {renderStarRow(2, "Below Average", "text-orange-500")}
          {renderStarRow(1, "Poor", "text-red-500")}
        </div>
      </div>
      <button
        onClick={handleAddReview}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Review
      </button>
      {showReviewForm && (
        <ReviewForm
          collegeId={id}
          setReviews={setReviews}
          setShowReviewForm={setShowReviewForm}
          handleReviewSubmit={handleReviewSubmit}
        />
      )}
      {reviews.length > 0 ? (
        <ReviewList
          reviews={reviews}
          setReviews={setReviews}
          onEditReview={fetchCollegeAndReviews}
          onDeleteReview={fetchCollegeAndReviews}
        />
      ) : (
        <p className="mt-4">No reviews yet, be the first to review</p>
      )}
    </div>
  );
};

export default CollegeDetails;
