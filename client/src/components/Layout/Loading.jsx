import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 z-50">
      <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-8 border-t-purple-500" />
    </div>
  );
};

export default Loading;
