import React from "react";

export default function Result({ score, total, restart }) {
  return (
    <div className="w-full max-w-xl bg-white/20 p-8 rounded-xl text-center backdrop-blur-lg">
      <h1 className="text-4xl font-bold mb-4">🎉 Quiz Completed!</h1>

      <p className="text-2xl font-medium mb-6">
        You scored <span className="font-bold">{score}</span> / {total}
      </p>

      <button
        className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-xl text-white text-lg cursor-pointer font-semibold"
        onClick={restart}
      >
        Restart Quiz
      </button>
    </div>
  );
}
