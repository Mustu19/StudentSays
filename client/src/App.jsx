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
import AddCollege from "./components/pages/AddCollege";

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
          <Route path="/addCollege" element={<AddCollege />} />
          {/* <Route path="/predict" element={<Predict />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
