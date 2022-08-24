import React, { useState } from 'react';
import { QuestionState, fetchQuizQuestions, Difficulty } from './API';
// Components
import QuestionCard from './components/QuestionCard';

type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [socre, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

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
            {/*<QuestionCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                questions={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number]: undefined}
                callback={checkAnswer}
    />*/}
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>
        </div>
    );
};

export default App;
