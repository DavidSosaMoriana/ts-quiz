import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';

const App = () => {
    const [loading, setLoading] = useState(false);

    const startTrivia = async () => {};

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

    const nextQuestion = () => {};

    return (
        <div className="App">
            <h1>REACT QUIZ</h1>
            <button className="start" onClick={startTrivia}>
                start
            </button>
            <p className="score">Score:</p>
            <p>Loading questions...</p>
            <QuestionCard />
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>
        </div>
    );
};

export default App;
