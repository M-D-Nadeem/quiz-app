
import { useDispatch, useSelector } from "react-redux";
import FetchButton from "./FetchButton";

function FinalScreen() {
  const score = useSelector((state) => state.Reducer.score);
  console.log(score);
  const dispatch = useDispatch();

  const replay = () => {
    dispatch({ type: "SET_INDEX", index: 0 });
    dispatch({ type: "SET_SCORE", score: 0 });
  };

  const settings = () => {
    dispatch({ type: "SET_QUESTIONS", questions: [] });
    dispatch({ type: "SET_SCORE", score: 0 });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h3 className="text-3xl font-bold mb-6 text-green-600">Final Score: {score}</h3>
      <button onClick={replay} className="bg-yellow-500 text-white p-2 rounded mb-4 hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-105">Try again</button>
      <FetchButton text="Fetch new questions" className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105" />
      <button onClick={settings} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">Back to settings</button>
    </div>
  );
}
export default FinalScreen;
