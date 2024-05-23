import React, { useState } from "react";

const Predict = () => {
  const [caste, setCaste] = useState("");
  const [percentile, setPercentile] = useState("");
  const [acpcRank, setAcpcRank] = useState("");
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleCasteChange = (event) => {
    setCaste(event.target.value);
  };

  const handlePercentileChange = (event) => {
    setPercentile(event.target.value);
  };

  const handleAcpcRankChange = (event) => {
    setAcpcRank(event.target.value);
  };

  const handlePredict = () => {
    if (!caste || !percentile || !acpcRank) {
      setError("All fields are required");
      return;
    }
    // Perform prediction logic here
    const predictedResult = `Predicted result for caste: ${caste}, percentile: ${percentile}, ACPC rank: ${acpcRank}`;
    setPrediction(predictedResult);
    setError("");
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="caste" className="text-lg text-black">
            What is your caste?
          </label>
          <select
            id="caste"
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={caste}
            onChange={handleCasteChange}
          >
            <option value="">Select Caste</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="percentile" className="text-lg text-black">
            How is your percentile in (HSC+GUJCET)?
          </label>
          <input
            id="percentile"
            type="number"
            min="0"
            max="100"
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={percentile}
            onChange={handlePercentileChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="acpcRank" className="text-lg text-black">
            What is your ACPC rank?
          </label>
          <input
            id="acpcRank"
            type="number"
            min="0"
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={acpcRank}
            onChange={handleAcpcRankChange}
          />
        </div>
        <button
          onClick={handlePredict}
          className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          Predict
        </button>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex flex-col mt-4">
          <div
            id="prediction"
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          >
            {prediction}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
