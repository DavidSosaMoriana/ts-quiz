import React from 'react';

type Props = {
    questions: string;
    answers: string[];
    callback: any;
    userAnswer: any;
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
                <div>
                    <button disabled={userAnswer} onClick={callback}>
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
