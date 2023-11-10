// Quiz.js
import React, { useState, useEffect , } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes (600 seconds)
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);

  const isLastQuestion = currentQuestion === quizData.length - 1;

  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Capture the quiz start time
    if (!quizStartTime) {
      setQuizStartTime(new Date());
    }

    // Automatically submit the quiz when the timer reaches zero
    if (timer === 0) {
      handleNextOrSubmit();
    }

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
      // Capture the quiz end time when the component unmounts
      if (!quizEndTime) {
        setQuizEndTime(new Date());
      }
    };
  }, [timer, quizStartTime, quizEndTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return (timer / 600) * 100; // Assuming 600 seconds as the total time
  };

  const getProgressBarVariant = () => {
    const percentage = calculateProgress();
    if (percentage >= 70) {
      return 'success';
    } else if (percentage >= 40) {
      return 'warning';
    } else {
      return 'danger';
    }
  };

  const handleNextOrSubmit = () => {
    // Capture the quiz end time when submitting the quiz
    if (!quizEndTime) {
      setQuizEndTime(new Date());
    }

    if (isLastQuestion || timer === 0) {
      // Calculate the score for all questions
      const newScore = quizData.reduce((totalScore, question, index) => {
        const isCorrect = question.answers.some(
          (answer) => answer.text === selectedAnswers[index] && answer.isCorrect
        );
        return isCorrect ? totalScore + 1 : totalScore;
      }, 0);

      setScore(newScore);
      setShowModal(true);
    } else {
      // Move to the next question
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePrevious = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);

      // Retrieve and set the previously selected answer for the previous question
      const prevSelectedAnswer = selectedAnswers[prevQuestion];
      setSelectedAnswers((prevSelectedAnswers) => {
        const updatedSelectedAnswers = [...prevSelectedAnswers];
        updatedSelectedAnswers[prevQuestion] = prevSelectedAnswer;
        return updatedSelectedAnswers;
      });
    }
  };

  const handleAnswerChange = (text) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = [...prevSelectedAnswers];
      updatedSelectedAnswers[currentQuestion] = text;
      return updatedSelectedAnswers;
    });
  };
const navigate= useNavigate();
  const handleClose = () => {
    setShowModal(false);
    // Redirect to /menu
    // history.push('/menu'); // If you're using useHistory, uncomment this line
      navigate("/rank")
    // Log the quiz duration
    if (quizStartTime && quizEndTime) {
      const durationInSeconds = (quizEndTime - quizStartTime) / 1000;
      console.log(`Quiz duration: ${durationInSeconds} seconds`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mt-3">
        <center>
        <p className='display-3 text-primary'> {formatTime(timer)}</p>
        </center>
        <ProgressBar
          variant={getProgressBarVariant()}
          now={calculateProgress()}
          
        />
      </div>
      <hr/>
      <h1 className="mb-4">{quizData[currentQuestion].question}</h1>
      <div className="d-flex flex-column">
        {quizData[currentQuestion].answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswers[currentQuestion] === answer.text ? 'primary' : 'outline-primary'}
            className="mb-2"
            onClick={() => handleAnswerChange(answer.text)}
          >
            {answer.text}
          </Button>
        ))}
      </div>

      {/* Timer Display */}
      {/* <div className="mt-3">
        <p>Time Left: {formatTime(timer)}</p>
        <ProgressBar
          variant={getProgressBarVariant()}
          now={calculateProgress()}
          label={`${formatTime(timer)}`}
        />
      </div> */}

      {/* Next/Submit and Previous Buttons */}
      <div className="mt-3">
        {currentQuestion > 0 && (
          <Button variant="secondary" className="mr-2" onClick={handlePrevious}>
            <BsArrowLeft className="mr-1" /> Previous
          </Button>
        )}
        <span className="mr-2"></span>
        <Button variant="primary" onClick={handleNextOrSubmit}>
          {isLastQuestion ? (
            <>
              Submit <FaCheck className="ml-1" />
            </>
          ) : (
            <>
              Next <BsArrowRight className="ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Bootstrap Modal for Final Popup */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your score is {score}/{quizData.length}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Quiz.propTypes = {
  quizData: PropTypes.array.isRequired,
};

export default Quiz;
