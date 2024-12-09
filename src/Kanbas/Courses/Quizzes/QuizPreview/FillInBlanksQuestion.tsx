import React from 'react';

interface QuestionProps {
    question: {
      id: string;
      title: string;
      questionText: string;
      choices?: { text: string; isCorrect: boolean }[];
      isTrue?: boolean;
      correctAnswers?: string[];
    };
    answer: any;
    onChange: (answer: any) => void;
}

function FillInBlanksQuestion({ question, answer, onChange }: QuestionProps) {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      {/* Question Title and Description */}
      <div className="card-header">
        <h4 className="card-title">{question.title}</h4>
        <p className="card-text">{question.questionText}</p>
      </div>

      {/* Answer Input Fields */}
      <div className="card-body">
        {question.correctAnswers && question.correctAnswers.map((correctAnswer, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              value={answer || ''}
              onChange={(e) => onChange(e.target.value)}
              className="form-control"
              placeholder={`Answer ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FillInBlanksQuestion;
