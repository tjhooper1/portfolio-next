"use client";
import React, { useState } from "react";

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    console.log("clicked");
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col items-center justify-center mb-3">
      <button
        onClick={toggleDropdown}
        className="mb-3 max-w-32 rounded bg-yellow-300 px-4 py-2 font-bold text-black hover:bg-yellow-400"
      >
        See More
      </button>
      {isOpen && (
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
