import React from "react";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/pages/Home";
import TermsAndConditions from "./components/pages/TermsAndConditions";
import Footer from "./components/Layout/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Privacy from "./components/pages/Privacy";
import PageNotFound from "./components/pages/NotFound";
import Loading from "./components/Layout/Loading";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
// import Predict from "./components/pages/Predict";
import LogOut from "./components/pages/LogOut";
import AddCollege from "./components/Admin/AddCollege";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageColleges from "./components/Admin/ManageColleges";
import ManageUsers from "./components/Admin/ManageUsers";
import EditCollege from "./components/Admin/EditCollege";
import CollegeDetails from "./components/pages/CollegeDetails";
import ReviewForm from "./components/pages/ReviewForm"

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/addCollege" element={<ProtectedRoute><AddCollege /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/colleges" element={<ProtectedRoute><ManageColleges /></ProtectedRoute>} />
          <Route path="/admin/colleges/:collegeId/edit" element={<ProtectedRoute><EditCollege /></ProtectedRoute>} />
          {/* <Route path="/predict" element={<Predict />} /> */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/colleges/:id" element={<CollegeDetails />} />
          <Route path="/reviewForm/:id" element={<ReviewForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
