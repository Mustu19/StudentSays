import React from "react";
import { useAuth } from "../store/Auth";

const DeleteCollege = ({ collegeId, onDelete }) => {
  const { API, authorizationToken } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API}/api/admin/colleges/${collegeId}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        onDelete(collegeId);
      } else {
        console.error("Failed to delete college");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteCollege;
