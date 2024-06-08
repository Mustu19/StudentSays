import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const ReviewList = ({ reviews, setReviews, onEditReview, onDeleteReview }) => {
  const { API, authorizationToken, user } = useAuth();
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editRatings, setEditRatings] = useState({});

  const handleDelete = async (id) => {
    const response = await fetch(`${API}/api/reviews/deleteReview/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationToken,
      },
    });

    if (response.ok) {
      setReviews((prev) => prev.filter((review) => review._id !== id));
      toast.success("Review deleted successfully");
      onDeleteReview();
    } else {
      const errorData = await response.json();
      toast.error(errorData.message);
    }
  };

  const handleEditClick = (review) => {
    setEditReviewId(review._id);
    setEditReviewText(review.reviewText);
    setEditRatings(review.ratings);
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await fetch(`${API}/api/reviews/updateReview/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          reviewText: editReviewText,
          ratings: editRatings,
        }),
      });

      if (response.ok) {
        const updatedReview = await response.json();
        setReviews((prev) =>
          prev.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          )
        );
        setEditReviewId(null);
        toast.success("Review updated successfully");
        onEditReview();
      } else {
        const errorData = await response.json();
        console.error("Error Updating Response:", errorData);
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Error updating review");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {reviews.length ? (
        reviews.map((review, index) => (
          <div
            key={`${review._id}-${index}`}
            className="border-b border-gray-300 pb-6 mb-6"
          >
            {editReviewId === review._id ? (
              <div>
                <textarea
                  value={editReviewText}
                  onChange={(e) => setEditReviewText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  {[
                    "placement",
                    "faculty",
                    "facility",
                    "curriculum",
                    "overallDevelopment",
                  ].map((category) => (
                    <div key={category} className="flex justify-between">
                      <span className="capitalize">{category}</span>
                      <input
                        type="number"
                        min={0}
                        max={5}
                        value={editRatings[category]}
                        onChange={(e) =>
                          setEditRatings({
                            ...editRatings,
                            [category]: e.target.value,
                          })
                        }
                        className="w-16 p-1 border border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditReviewId(null)}
                    className="text-gray-600 hover:text-gray-800 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(review._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg">{review.reviewText}</p>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                  <div>
                    By {review.user.username} on{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  {(user?.isAdmin || review.user._id === user?._id) && (
                    <div className="flex">
                      <button
                        onClick={() => handleEditClick(review)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  {[
                    "placement",
                    "faculty",
                    "facility",
                    "curriculum",
                    "overallDevelopment",
                  ].map((category) => (
                    <div key={category} className="flex justify-between">
                      <span className="capitalize">{category}</span>
                      <span>{review.ratings[category]}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold">
                    <span>Average</span>
                    <span>{review.averageRating}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ReviewList;
