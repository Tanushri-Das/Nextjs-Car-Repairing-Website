import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RenderStarsProps {
  rating: number; // Explicitly set the type of rating to number
}

const RenderStars: React.FC<RenderStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
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
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
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
