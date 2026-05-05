import React from 'react';
import './QuizList.css';

function QuizList({ quizzes, onQuizSelect }) {
  return (
    <div className="quiz-list">
      <h2>Available Quizzes</h2>
      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="quiz-card"
            onClick={() => onQuizSelect(quiz)}
          >
            <h3>{quiz.chapter_title}</h3>
            <div className="quiz-info">
              <span>{quiz.questions.length} Questions</span>
              <span className="start-btn">Start Quiz →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;