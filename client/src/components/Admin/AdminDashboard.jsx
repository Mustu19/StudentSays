import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Admin Dashboard</h1>
      <ul className="flex">
        <li className="mr-4">
          <Link
            to="/admin/addCollege"
            className="text-green-500 hover:text-green-700 font-bold"
          >
            Add College
          </Link>
        </li>
        <li className="mr-4">
          <Link
            to="/admin/users"
            className="text-green-500 hover:text-green-700 font-bold"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/colleges"
            className="text-green-500 hover:text-green-700 font-bold"
          >
            Colleges
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
