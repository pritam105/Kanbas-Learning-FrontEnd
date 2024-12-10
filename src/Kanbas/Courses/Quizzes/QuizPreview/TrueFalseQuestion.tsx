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
  onChange?: (answer: any) => void;  // Optional onChange prop for editable mode
  isCorrect?: boolean;  // Optional isCorrect prop for results mode
}

function TrueFalseQuestion({ question, answer, onChange, isCorrect }: QuestionProps) {
  // If isCorrect is provided, render the question in read-only mode
  const isReadOnly = typeof isCorrect === 'boolean';

  return (
    <div className={`card p-3 mb-4 shadow-sm ${isCorrect ? 'bg-success' : isCorrect === false ? 'bg-danger' : ''}`}>
      {/* Question Title and Description */}
      <div className="card-header">
        <h4 className="card-title">{question.title}</h4>
        <p className="card-text" dangerouslySetInnerHTML={{ __html: question.questionText }} />
      </div>

      {/* True/False Options */}
      <div className="card-body">
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name={`question-${question._id}`}
            checked={answer === true}
            onChange={isReadOnly ? undefined : () => onChange?.(true)}  // Disable onChange if read-only
            disabled={isReadOnly} // Disable input when in results mode
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name={`question-${question._id}`}
            checked={answer === false}
            onChange={isReadOnly ? undefined : () => onChange?.(false)}  // Disable onChange if read-only
            disabled={isReadOnly} // Disable input when in results mode
          />
          <label className="form-check-label">False</label>
        </div>
      </div>
    </div>
  );
}

export default TrueFalseQuestion;
