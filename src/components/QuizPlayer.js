import React, { useState } from 'react';
import './QuizPlayer.css';

function QuizPlayer({ quiz, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="quiz-complete">
        <h2>Quiz Complete!</h2>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-percentage">{percentage}%</span>
          </div>
          <p>You got {score} out of {totalQuestions} questions correct</p>
        </div>
        <div className="quiz-complete-actions">
          <button className="btn-restart" onClick={handleRestart}>
            Retake Quiz
          </button>
          <button className="btn-back" onClick={onBack}>
            Back to Quiz List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-player">
      <div className="quiz-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to List
        </button>
        <div className="progress-info">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
        </div>
      </div>

      <h2 className="chapter-title">{quiz.chapter_title}</h2>

      <div className="question-card">
        <div className="question-stem">
          <h3>Question {currentQuestion + 1}:</h3>
          <p>{question.stem}</p>
        </div>

        {question.figure_name && (
          <div className="question-figure">
            <img
              src={`/images/${question.figure_name}`}
              alt="Question figure"
              className="figure-image"
            />
          </div>
        )}

        <div className="options-list">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option-item ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showResult && index === question.answer ? 'correct' : ''
              } ${
                showResult &&
                selectedAnswer === index &&
                index !== question.answer
                  ? 'incorrect'
                  : ''
              }`}
              onClick={() => !showResult && setSelectedAnswer(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </div>
          ))}
        </div>

        {!showResult ? (
          <button
            className="btn-submit"
            onClick={handleAnswerSubmit}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        ) : (
          <div className="result-section">
            <div className="explanation">
              <h4>
                {selectedAnswer === question.answer
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </h4>
              <p>{question.explanation}</p>
            </div>
            <button className="btn-next" onClick={handleNextQuestion}>
              {currentQuestion < totalQuestions - 1
                ? 'Next Question'
                : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPlayer;