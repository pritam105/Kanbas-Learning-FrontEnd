import React from 'react';

interface QuestionProps {
  question: {
      id: string;
      title: string;
      questionText: string;
    correctAnswers?: string[];
  };
  answer: any;
  onChange?: (answer: any) => void;  // Optional onChange for editable mode
  isCorrect?: boolean;  // Optional isCorrect for result mode
}

function FillInBlanksQuestion({ question, answer, onChange, isCorrect }: QuestionProps) {
  // If isCorrect is provided, render the question in read-only mode
  const isReadOnly = typeof isCorrect === 'boolean';

  return (
    <div className={`card p-3 mb-4 shadow-sm ${isCorrect ? 'bg-success' : isCorrect === false ? 'bg-danger' : ''}`}>
      {/* Question Title and Description */}
      <div className="card-header">
        <h4 className="card-title">{question.title}</h4>
        <p className="card-text" dangerouslySetInnerHTML={{ __html: question.questionText }} />
      </div>

      {/* Answer Input Fields */}
      <div className="card-body">
        {question.correctAnswers &&
          <div className="mb-3">
            <input
              type="text"
              value={answer || ''}
              onChange={isReadOnly ? undefined : (e) => onChange?.(e.target.value)} // Disable onChange if read-only
              disabled={isReadOnly} // Disable input when in results mode
              className="form-control"
              placeholder={`Answer`}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default FillInBlanksQuestion;
