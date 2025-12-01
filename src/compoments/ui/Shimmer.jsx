import React from "react";

export default function Shimmer({ count = 3 }) {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-white/30 rounded-lg"
        />
      ))}
    </div>
  );
}

  