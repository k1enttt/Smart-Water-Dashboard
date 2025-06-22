'use client'

import React, { useState } from "react";

const WateringButton = () => {
  const [requested, setRequested] = useState(false);

  const handleClick = () => {
    setRequested(true);
    setTimeout(() => setRequested(false), 2000);
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded focus:outline-none transition-colors ${
        requested
          ? "bg-blue-500 text-white"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
      onClick={handleClick}
      disabled={requested}
    >
      {requested ? "Đã yêu cầu tưới" : "Tưới ngay"}
    </button>
  );
};

export default WateringButton;
