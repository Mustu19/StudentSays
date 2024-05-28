import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";

const AddCollege = () => {
  const { API, authorizationToken } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [collegeData, setCollegeData] = useState({
    name: "",
    description: "",
    website: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

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
      const response = await fetch(`${API}/api/admin/colleges/addCollege`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("College added:", data);
        // Reset form
        setCollegeData({
          name: "",
          description: "",
          website: "",
        });
        setSelectedFile(null);
        navigate("/admin/colleges");
      } else {
        console.error("Failed to add college");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Add College</h1>
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
            Website URL
          </label>
          <textarea
            id="website"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={collegeData.website}
            onChange={handleInput}
            name="website"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add College
        </button>
      </form>
    </div>
  );
};

export default AddCollege;
