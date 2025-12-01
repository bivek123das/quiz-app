export default function Question({ data, answerClick, selectAnswer, onNext }) {
    return (
      <div className="w-full max-w-2xl bg-white/20 p-6 rounded-xl backdrop-blur-lg shadow-lg">
  
        {/* QUESTION TEXT */}
        <h2
          className="text-xl font-semibold mb-4"
          dangerouslySetInnerHTML={{ __html: data.question }}
        />
  
        {/* ANSWERS */}
        <div className="flex flex-col gap-3">
          {data.answers.map((ans, idx) => {
            let bgColor = "bg-white/30"; // default neutral
  
            if (selectAnswer !== null) {
              if (ans.isCorrect) bgColor = "bg-green-500 text-white"; // correct answer
              else if (!ans.isCorrect && ans.isCorrect !== true && selectAnswer === false) {
                bgColor = "bg-red-500 text-white"; // wrong answer only if selected
              }
            }
  
            return (
              <button
                key={idx}
                className={`p-3 rounded-lg cursor-pointer border ${bgColor} hover:bg-white/40 transition`}
                onClick={() => answerClick(ans.isCorrect)}
                dangerouslySetInnerHTML={{ __html: ans.answer }}
              />
            );
          })}
        </div>
  
        {/* NEXT BUTTON */}
        {selectAnswer !== null && (
          <button
            onClick={onNext}
            className="mt-5 w-full p-3 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Next
          </button>
        )}
      </div>
    );
  }
  
  
  
