import QuizCom from "../components/QuizCom";
import {useLocation} from 'react-router-dom';
const Quiz = ()=>{
    const location = useLocation();
    //  console.log(location.state.question);
    //  console.log(params.question)
    const data=[];
    location.state.question.forEach((object, index) => {
      data.push({
        question : object.text,
        answers : object.options });
    });
    console.log(location.state.id);

    return <QuizCom quizData={data} questionId={location.state.id}/>;
}
export default Quiz;