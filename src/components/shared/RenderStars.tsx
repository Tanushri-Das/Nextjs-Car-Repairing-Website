import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RenderStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array(fullStars).fill().map((_, index) => (
        <FaStar
          key={`full-${index}`}
          className="w-5 h-5 mr-1"
          style={{ color: "#FF912C" }}
        />
      ))}
      {halfStar && (
        <FaStarHalfAlt
          key="half"
          className="w-5 h-5 mr-1"
          style={{ color: "#FF912C" }}
        />
      )}
      {Array(emptyStars).fill().map((_, index) => (
        <FaStar
          key={`empty-${index}`}
          className="w-5 h-5 mr-1"
          style={{ color: "#737373" }}
        />
      ))}
    </div>
  );
};

export default RenderStars;
