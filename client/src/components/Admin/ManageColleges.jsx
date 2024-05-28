import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import DeleteCollege from "./DeleteCollege";
import { Link } from "react-router-dom";

const ManageColleges = () => {
  const { API, authorizationToken } = useAuth();
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API}/api/admin/colleges`, {
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setColleges(data);
        } else {
          console.error("Failed to fetch colleges");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchColleges();
  }, [API, authorizationToken]);

  const handleDelete = (collegeId) => {
    setColleges(colleges.filter((college) => college._id !== collegeId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Manage Colleges</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Logo</th>
            <th>Description</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => (
            <tr key={college._id}>
              <td>{college.name}</td>
              <td>{college.logo}</td>
              <td>{college.description}</td>
              <td>{college.website}</td>
              <td className="flex">
                <DeleteCollege
                  collegeId={college._id}
                  onDelete={handleDelete}
                />
                <Link
                  to={`/admin/colleges/${college._id}/edit`}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded ml-2"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageColleges;
