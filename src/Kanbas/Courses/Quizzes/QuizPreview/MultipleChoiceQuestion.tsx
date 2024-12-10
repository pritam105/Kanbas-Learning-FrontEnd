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
  onChange?: (answer: any) => void;  // Optional onChange for editable mode
  isCorrect?: boolean;  // Optional isCorrect for result mode
}

function MultipleChoiceQuestion({ question, answer, onChange, isCorrect }: QuestionProps) {
  // If isCorrect is provided, render the question in read-only mode
  const isReadOnly = typeof isCorrect === 'boolean';

  return (
    <div className={`card p-3 mb-4 shadow-sm ${isCorrect ? 'bg-success' : isCorrect === false ? 'bg-danger' : ''}`}>
    {/* Question Title and Description */}
    <div className="card-header">
      <h4 className="card-title">{question.title}</h4>
      <p className="card-text" dangerouslySetInnerHTML={{ __html: question.questionText }} />
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
            onChange={isReadOnly ? undefined : () => onChange?.(choice.text)}  // Disable onChange if read-only
            disabled={isReadOnly} // Disable input when in results mode
          />
          <label className="form-check-label">{choice.text}</label>
        </div>
      ))}
    </div>
    </div>
  );
}

export default MultipleChoiceQuestion;
