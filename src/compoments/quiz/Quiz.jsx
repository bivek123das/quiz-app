import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Question from "./Question";
import Result from "./Result";
import Loader from "../ui/Loader";
import Shimmer from "../ui/Shimmer";

export default function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectcategory, setSelectcategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionindex, setQuestionindex] = useState(0);
  const [score, setScore] = useState(0);
  const [showresult, setShowresult] = useState(false);
  const [selectanswer, setSelectanswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(15); // 15 seconds per question

  // ======================
  // Fetch categories
  // ======================
  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => {
        setCategories(res.data.trivia_categories);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // ======================
  // Select category
  // ======================
  const categorySelect = (cat) => {
    setSelectcategory(cat);
    setLoading(true);

    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${cat.id}&difficulty=easy&type=multiple`
      )
      .then((res) => {
        const formatted = res.data.results.map((q) => {
          const answers = [
            ...q.incorrect_answers.map((a) => ({ answer: a, isCorrect: false })),
            { answer: q.correct_answer, isCorrect: true },
          ].sort(() => Math.random() - 0.5);

          return {
            question: q.question,
            answers,
          };
        });

        setQuestions(formatted);
        setLoading(false);
        setTimer(30); // reset timer for first question
      });
  };
   

 

  // ======================
  // Answer click
  // ======================
  const answerClick = (isCorrect) => {
    if (selectanswer === null) {
      setSelectanswer(isCorrect);
      if (isCorrect) setScore((prev) => prev + 1);
    }
  };

   // ======================
  // NEXT QUESTION
  // ======================
  const next = useCallback(() => {
    setSelectanswer(null);
    setTimer(15); // reset timer for next question

    if (questionindex < questions.length - 1) {
      setQuestionindex((prev) => prev + 1);
    } else {
      setShowresult(true);
    }
  }, [questionindex, questions]);

   // ======================
  // Timer effect
  // ======================
  
  useEffect(() => {
    if (!selectcategory || showresult || loading) return;
  
    if (timer === 0) {
      const timeout = setTimeout(() => {
        next(); // ✅ now it's async
      }, 0);
      return () => clearTimeout(timeout);
    }
  
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timer, selectcategory, showresult, loading, next]);
  

  // ======================
  // Restart Quiz
  // ======================
  const restart = () => {
    setSelectcategory(null);
    setQuestions([]);
    setQuestionindex(0);
    setScore(0);
    setSelectanswer(null);
    setShowresult(false);
    setTimer(15);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-700 flex flex-col items-center p-4 text-white">

  {/* Title */}
  <h1 className="text-4xl font-bold mb-12">Quiz App</h1>

  {/* Category selection */}
  {!selectcategory ? (
    <div className="w-full max-w-2xl bg-white/20 p-6 rounded-xl backdrop-blur-lg shadow-lg mt-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Choose a Quiz Category</h2>

      {loading ? (
        <Shimmer count={5} />
      ) : (
        <div className="flex flex-col gap-4">
          {categories.slice(10, 15).map((cat) => (
            <button
              key={cat.id}
              className="p-4 bg-white/20 cursor-pointer rounded-xl text-white font-semibold hover:bg-white/30 transition"
              onClick={() => categorySelect(cat)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  ) : loading ? (
    <Loader />
  ) : showresult ? (
    <Result score={score} total={questions.length} restart={restart} />
  ) : (
    <>
      {/* Timer */}
      <div className="mb-4 text-xl font-semibold">
        Time Left: {timer}s
      </div>

      {/* Question */}
      <Question
        data={questions[questionindex]}
        answerClick={answerClick}
        selectAnswer={selectanswer}
        onNext={next}
      />
    </>
  )}
</div>

  );
}





