import React from "react";

export const Card = ({ title, description }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-4">
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
