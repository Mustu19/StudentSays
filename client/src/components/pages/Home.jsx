import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import CollegeCard from "./CollegeCard";

const Home = () => {
  const { API, authorizationToken } = useAuth();
  const [colleges, setColleges] = useState([]);
  
  useEffect(() => {
    const fetchColleges = async () => {
      const response = await fetch(`${API}/api/colleges`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setColleges(data);
    };

    fetchColleges();
  }, [API, authorizationToken]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {colleges.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
