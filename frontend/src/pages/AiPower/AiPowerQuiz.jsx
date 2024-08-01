
import { useDispatch, useSelector } from "react-redux";
import FetchButton from "./FetchButton";
import { useEffect, useState } from "react";

function Settings() {
  const [options, setOptions] = useState(null);
  const loading = useSelector((state) => state.Reducer.options.loading);
  const questionCategory = useSelector((state) => state.Reducer.options.question_category);
  const questionDifficulty = useSelector((state) => state.Reducer.options.question_difficulty);
  const questionType = useSelector((state) => state.Reducer.options.question_type);
  const questionAmount = useSelector((state) => state.Reducer.options.amount_of_questions);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    const handleLoadingChange = (value) => {
      dispatch({ type: "CHANGE_LOADING", loading: value });
    };

    handleLoadingChange(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);

  const handleCategoryChange = (event) => {
    dispatch({ type: "CHANGE_CATEGORY", question_category: event.target.value });
  };

  const handleDifficultyChange = (event) => {
    dispatch({ type: "CHANGE_DIFFICULTY", question_difficulty: event.target.value });
  };

  const handleTypeChange = (event) => {
    dispatch({ type: "CHANGE_TYPE", question_type: event.target.value });
  };

  const handleAmountChange = (event) => {
    dispatch({ type: "CHANGE_AMOUNT", amount_of_questions: event.target.value });
  };

  if (!loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 animate-pulse">Quiz App</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Select Category:</h2>
          <select value={questionCategory} onChange={handleCategoryChange} className="p-2 border rounded">
            <option>All</option>
            {options && options.length && options.map((option) => (
              <option value={option.id} key={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Select Difficulty:</h2>
          <select value={questionDifficulty} onChange={handleDifficultyChange} className="p-2 border rounded">
            <option value="all" key="difficulty-0">All</option>
            <option value="easy" key="difficulty-1">Easy</option>
            <option value="medium" key="difficulty-2">Medium</option>
            <option value="hard" key="difficulty-3">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Select Question Type:</h2>
          <select value={questionType} onChange={handleTypeChange} className="p-2 border rounded">
            <option value="" key="type-0">All</option>
            <option value="multiple" key="type-1">Multiple Choice</option>
            <option value="boolean" key="type-2">True/False</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Amount of Questions:</h2>
          <input value={questionAmount} onChange={handleAmountChange} className="p-2 border rounded" />
        </div>
        <FetchButton text="Get started!" className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105" />
      </div>
    );
  }

  return <p className="text-xl font-semibold text-gray-700 animate-bounce">LOADING...</p>;
}
export default Settings;
