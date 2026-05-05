import React, { useState } from 'react';
import './App.css';
import QuizList from './components/QuizList';
import QuizPlayer from './components/QuizPlayer';
import { quizzes } from './data/quizzes';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleBackToList = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Medical Quiz App</h1>
      </header>
      <main>
        {selectedQuiz ? (
          <QuizPlayer quiz={selectedQuiz} onBack={handleBackToList} />
        ) : (
          <QuizList quizzes={quizzes} onQuizSelect={handleQuizSelect} />
        )}
      </main>
    </div>
  );
}

export default App;