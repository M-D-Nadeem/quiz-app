import { useSelector } from "react-redux";
import Settings from "../pages/AiPower/AiPowerQuiz";
import FinalScreen from "../pages/AiPower/FinalScreen";
import Question from "../pages/AiPower/Question";

const AiPowerPageComponent=()=>{
    const questions = useSelector((state) => state.Reducer.questions);
    const questionIndex = useSelector((state) => state.Reducer.index);
  
    let component;
  
    if (questions.length && questionIndex + 1 <= questions.length) {
      component = <Question />;
    } else if (!questions.length) {
      component = <Settings />;
    } else {
      component = <FinalScreen />;
    }
    return(
        <>
        <div className="app-container">{component}</div>
        </>
    )
}
export default AiPowerPageComponent