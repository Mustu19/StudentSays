import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import DeleteUser from "./DeleteUser";

const ManageUsers = () => {
  const { API, authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API}/api/admin/users`, {
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, [API, authorizationToken]);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Manage Users</h1>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-400 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-400 px-4 py-2">{user.email}</td>
              <td className="border border-gray-400 px-4 py-2">
                <DeleteUser userId={user._id} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
