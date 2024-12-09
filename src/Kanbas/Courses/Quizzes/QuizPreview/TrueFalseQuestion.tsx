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

function TrueFalseQuestion({ question, answer, onChange }: QuestionProps) {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      {/* Question Title and Description */}
      <div className="card-header">
        <h4 className="card-title">{question.title}</h4>
        <p className="card-text">{question.questionText}</p>
      </div>

      {/* True/False Options */}
      <div className="card-body">
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name={`question-${question._id}`}
            checked={answer === true}
            onChange={() => onChange(true)}
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name={`question-${question._id}`}
            checked={answer === false}
            onChange={() => onChange(false)}
          />
          <label className="form-check-label">False</label>
        </div>
      </div>
    </div>
  );
}

export default TrueFalseQuestion;
