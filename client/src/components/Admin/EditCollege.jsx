import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
const EditCollege = () => {
  const { collegeId } = useParams();
  const { API, authorizationToken, fetchCollegeById } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [collegeData, setCollegeData] = useState({
    name: "",
    description: "",
    website: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollege = async () => {
      const data = await fetchCollegeById(collegeId);
      if (data) {
        setCollegeData({
          name: data.name,
          description: data.description,
          website: data.website,
        });
      }
    };
    fetchCollege();
  }, [API, fetchCollegeById, authorizationToken, collegeId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCollegeData({
      ...collegeData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", collegeData.name);
    formData.append("description", collegeData.description);
    formData.append("website", collegeData.website);
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    try {
      const response = await fetch(
        `${API}/api/admin/colleges/${collegeId}/edit`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            // "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("College updated successfully");
        navigate("/admin/colleges");
      } else {
        console.error("Failed to update college");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Edit College</h1>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={collegeData.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="logo"
          >
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // value={`http://localhost:5000${collegeData.logo}`}
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={collegeData.description}
            name="description"
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="website"
          >
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={collegeData.website}
            onChange={handleInput}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update College
        </button>
      </form>
    </div>
  );
};

export default EditCollege;
