import React from 'react';
//Types
import { AnswerObject } from '../App';

type Props = {
    questions: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
    questions,
    answers,
    questionNumber,
    callback,
    userAnswer,
    totalQuestions,
}) => (
    <div>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: questions }}></p>
        <div>
            {answers.map((answer) => (
                <div key={answer}>
                    <button
                        disabled={userAnswer ? true : false}
                        value={answer}
                        onClick={callback}
                    >
                        <span
                            dangerouslySetInnerHTML={{ __html: answer }}
                        ></span>
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;
