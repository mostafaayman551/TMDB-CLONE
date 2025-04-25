import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircleRating = ({ rate }) => {
  const safeRate = typeof rate === "number" ? rate : 0;
  return (
    <div className="w-12 h-12 relative bg-white rounded-full p-1">
      <CircularProgressbar
        value={safeRate * 10}
        text={`${safeRate.toFixed(1)}`}
        styles={buildStyles({
          textSize: "32px",
          pathColor: safeRate >= 7 ? "#4CAF50" : safeRate >= 5 ? "#FFC107" : "#F44336",
          textColor: "#111",
          trailColor: "#fff",
          backgroundColor: "#fff",
          pathTransitionDuration: 1.4
        })}
      />
    </div>
  );
};

export default CircleRating;
