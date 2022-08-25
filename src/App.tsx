import React, { useState } from 'react';
import { QuestionState, fetchQuizQuestions, Difficulty } from './API';
// Components
import QuestionCard from './components/QuestionCard';
//Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
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
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

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

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            //Respuesta del usuario
            const answer = e.currentTarget.value;
            //Comprobar la respuesta del usuario con la respuesta correcta
            const correct = questions[number].correct_answer === answer;
            //Añadir aciertos a la puntuación del usuario
            if (correct) setScore((prev) => prev + 1);
            //Guardar las respuestas del usuario
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    const nextQuestion = () => {
        //Continuar a la siguiente pregunta
        const nextQuestion = number + 1;

        if (nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>REACT QUIZ</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="start" onClick={startTrivia}>
                        start
                    </button>
                ) : null}

                {!gameOver ? <p className="score">Score: {score}</p> : null}
                {loading && <p>Loading questions...</p>}
                {!loading && !gameOver && (
                    <QuestionCard
                        questionNumber={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        questions={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={
                            userAnswers ? userAnswers[number] : undefined
                        }
                        callback={checkAnswer}
                    />
                )}
                {/*Si el usuario ya ha respondido a una pregunta muestras el boton de siguiente pregunta*/}
                {!gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== TOTAL_QUESTIONS - 1 ? (
                    <button className="next" onClick={nextQuestion}>
                        Next Question
                    </button>
                ) : null}
            </Wrapper>
        </>
    );
};

export default App;
