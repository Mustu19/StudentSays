import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const ReviewForm = ({ collegeId, setReviews, setShowReviewForm, handleReviewSubmit }) => {
  const { API, authorizationToken } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [ratings, setRatings] = useState({
    placement: 0,
    faculty: 0,
    facility: 0,
    curriculum: 0,
    overallDevelopment: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting review:", { collegeId, reviewText, ratings });

    try {
      const response = await fetch(`${API}/api/reviews/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ collegeId: collegeId, reviewText, ratings }),
      });

      if (response.ok) {
        const newReview = await response.json();
        console.log("New review added:", newReview);
        // setReviews((prevReviews) => [...prevReviews, newReview]);
        handleReviewSubmit(newReview);
        setShowReviewForm(false);
        toast.success("Review added successfully");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Error adding review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Write your review here..."
      />
      <div className="grid grid-cols-2 gap-4 text-sm">
        {["placement", "faculty", "facility", "curriculum", "overallDevelopment"].map((category) => (
          <div key={category} className="flex justify-between">
            <span className="capitalize">{category}</span>
            <input
              type="number"
              min={0}
              max={5}
              value={ratings[category]}
              onChange={(e) => setRatings({ ...ratings, [category]: e.target.value })}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={() => setShowReviewForm(false)}
          className="text-gray-600 hover:text-gray-800 mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="text-blue-500 hover:text-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
