import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import CollegeCard from "./CollegeCard";
import Search from "../Layout/Search";

const Home = () => {
  const { API, authorizationToken } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API}/api/colleges`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, [API, authorizationToken]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayColleges = searchTerm
    ? [
        ...filteredColleges,
        ...colleges.filter((college) => !filteredColleges.includes(college)),
      ]
    : colleges;

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex justify-center mb-8">
            <Search
              placeholder="Search College"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap -m-4">
            {displayColleges.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
