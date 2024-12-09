import React from 'react';

interface QuestionProps {
  question: {
    _id: string;
    title: string;
    questionText: string;
    choices?: { text: string; isCorrect: boolean }[];
    isTrue?: boolean;
    correctAnswers?: string[];
  };
  answer: any;
  onChange: (answer: any) => void;
}

function MultipleChoiceQuestion({ question, answer, onChange }: QuestionProps) {
  return (
  <div className="card p-3 mb-4 shadow-sm">
    {/* Question Title and Description */}
    <div className="card-header">
      <h4 className="card-title">{question.title}</h4>
      <p className="card-text">{question.questionText}</p>
    </div>

    {/* Multiple Choice Options */}
    <div className="card-body">
      {question.choices && question.choices.map((choice, index) => (
        <div key={index} className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name={`question-${question._id}`}
            checked={answer === choice.text}
            onChange={() => onChange(choice.text)}
          />
          <label className="form-check-label">{choice.text}</label>
        </div>
      ))}
    </div>
  </div>
  );
}

export default MultipleChoiceQuestion;
