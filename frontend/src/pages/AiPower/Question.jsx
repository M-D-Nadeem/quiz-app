
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const decodeHTML = function (html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

function Question() {
  const [questions, setQuestions] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const score = useSelector((state) => state.Reducer.score);
  const encodedQuestions = useSelector((state) => state.Reducer.questions);
  const questionIndex = useSelector((state) => state.Reducer.index);
  const dispatch = useDispatch();
  const question = questions[questionIndex];
  const answer = question && question.correct_answer;

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map(q => ({
      ...q,
      question: decodeHTML(q.question),
      correct_answer: decodeHTML(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a)),
    }));

    setQuestions(decodedQuestions);
  }, [encodedQuestions]);

  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  useEffect(() => {
    if (!question) return;

    let answers = [...question.incorrect_answers];
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);

    setOptions(answers);
  }, [question]);

  const handleListItemClick = (event) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);

    if (event.target.textContent === answer) {
      dispatch({ type: 'SET_SCORE', score: score + 1 });
    }

    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);
        dispatch({ type: 'SET_INDEX', index: questionIndex + 1 });
      }, 2500);
    }
  };

  const getClass = (option) => {
    if (!answerSelected) return '';
    if (option === answer) return 'bg-green-500 text-white';
    if (option === selectedAnswer) return 'bg-red-500 text-white';
  };

  if (!question) return <div className="text-2xl font-semibold">Loading</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <p className="text-xl font-semibold mb-4">Question {questionIndex + 1}</p>
      <h3 className="text-3xl font-bold mb-6">{question.question}</h3>
      <ul className="space-y-4 w-full max-w-xl">
        {options.map((option, i) => (
          <li
            key={i}
            onClick={handleListItemClick}
            className={`p-4 border rounded cursor-pointer ${getClass(option)} transition duration-300 ease-in-out transform hover:scale-105`}
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="mt-6 text-lg font-semibold">
        Score: {score} / {questions.length}
      </div>
    </div>
  );
}

export default Question;
