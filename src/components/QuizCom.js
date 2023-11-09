// Quiz.js
import React, { useState } from 'react';
import quizData from './quizData';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));
  const [showModal, setShowModal] = useState(false);

  const isLastQuestion = currentQuestion === quizData.length - 1;
  const navigate = useNavigate();

  const handleNextOrSubmit = () => {
    if (isLastQuestion) {
      // Submit the answer and show the modal
      const isCorrect = quizData[currentQuestion].answers.some(
        (answer) => answer.option === selectedAnswers[currentQuestion] && answer.isCorrect
      );

      if (isCorrect) {
        setScore(score + 1);
      }

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

  const handleAnswerChange = (option) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = [...prevSelectedAnswers];
      updatedSelectedAnswers[currentQuestion] = option;
      return updatedSelectedAnswers;
    });
  };

  const handleClose = () => {
    setShowModal(false);
    // Redirect to /menu
    navigate('/menu');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{quizData[currentQuestion].question}</h1>
      <div className="d-flex flex-column">
        {quizData[currentQuestion].answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswers[currentQuestion] === answer.option ? 'primary' : 'outline-primary'}
            className="mb-2"
            onClick={() => handleAnswerChange(answer.option)}
          >
            {answer.option}
          </Button>
        ))}
      </div>

      {/* Next/Submit and Previous Buttons */}
      <div className="mt-3">
        <Button variant="secondary" className="mr-2" onClick={handlePrevious}>
          <BsArrowLeft className="mr-1" /> Previous
        </Button>
        <span className="mr-2"></span>
        <Button variant="primary" onClick={handleNextOrSubmit}>
          {isLastQuestion ? 'Submit' : 'Next'} <BsArrowRight className="ml-1" />
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

export default Quiz;
