import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MultipleChoiceEditor from './QuestionEditor/MultipleChoiceEditor';
import TrueFalseEditor from './QuestionEditor/TrueFalseEditor';
import FillInBlanksEditor from './QuestionEditor/FillInBlanksEditor';

export default function QuestionEditor({ quizDetails, setQuizDetails } : any) {
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const [questionType, setQuestionType] = useState('multipleChoice');
  const [showNewQuestionEditor, setShowNewQuestionEditor] = useState(false);

  // State for a new question being created
  const [newQuestion, setNewQuestion] = useState({
    type: 'multipleChoice', // Default type is multipleChoice
    title: 'New Question',
    points: 5,
    questionText: 'Enter question text',
    choices: [
      { text: 'Option 1', isCorrect: false },
      { text: 'Option 2', isCorrect: true },
      { text: 'Option 3', isCorrect: false }
    ]
  });


  /**
   * handleSave:
   * If index is provided, we update an existing question at that index.
   * If index is not provided, we are saving the new question.
   */
  const handleSave = (questionData: any, index: any) => {
    console.log(questionData);
    if (typeof index === 'number') {
      // Update existing question
      console.log("inside if");
      const updatedQuestions = [...quizDetails.questions];
      updatedQuestions[index] = questionData;
      setQuizDetails((prev: any) => ({
        ...prev,
        questions: updatedQuestions
      }));
    } else {
      // Add the new question
      setQuizDetails((prev: any) => ({
        ...prev,
        questions: [...prev.questions, questionData]
      }));
    }
    setShowNewQuestionEditor(false);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };


  /**
   * handleCancel:
   * Removes the current question from quizDetails.questions by index if editing an existing question.
   */
  const handleCancel = (index?: number) => {
    console.log("index " + index);
    if (index !== undefined) {
      // Remove the question at the given index
      const updatedQuestions = [...quizDetails.questions];
      console.log("questions before slice " + JSON.stringify(updatedQuestions));
      updatedQuestions.splice(index, 1); // Removes the question at the given index
      console.log("questions after slice " + JSON.stringify(updatedQuestions));
      setQuizDetails((prev: any) => ({
        ...prev,
        questions: updatedQuestions
      }));
    }
    // console.log(" after setting state " + JSON.stringify(quizDetails.questions));
    // navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  /**
   * addQuestion:
   * Resets the newQuestion state to a default multiple-choice question.
   * User can then edit and save it.
   */
  const addQuestion = () => {
    setNewQuestion({
      type: 'multipleChoice',
      title: 'New Question',
      points: 5,
      questionText: 'Enter question text',
      choices: [
        { text: 'Option 1', isCorrect: true }
      ]
    });
    setShowNewQuestionEditor(true);
  };

  /**
   * handleTypeChange:
   * Allows changing the type of the new question before it is saved.
   */
  const handleTypeChange = (e: any) => {
    const selectedType = e.target.value;
    setNewQuestion(prev => ({
      ...prev,
      type: selectedType
    }));
  };

  /**
   * renderEditor:
   * Renders the appropriate question editor based on the question type.
   * If index is provided, it means we're editing an existing question.
   * If index is not provided, we are editing the new question.
   */
  const renderEditor = (question: any, index?: number) => {
    switch (question.type) {
      case 'multipleChoice':
        return (
          <MultipleChoiceEditor
            question={question}
            onSave={(data) => handleSave(data, index)}
            onCancel={() => handleCancel(index)}
          />
        );
      case 'trueFalse':
        const tfQuestion = { ...question, isTrue: true};
        delete tfQuestion.choices;
        return (
          <TrueFalseEditor
            question={tfQuestion}
            onSave={(data) => handleSave(data, index)}
            onCancel={() => handleCancel(index)}
          />
        );
      case 'fillInBlanks':
        const fibQuestion = { ...question, correctAnswers: [""]};
        delete fibQuestion.choices;
        return (
          <FillInBlanksEditor
            question={fibQuestion}
            onSave={(data) => handleSave(data, index)}
            onCancel={() => handleCancel(index)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Button to initialize adding a new question */}
      <button onClick={addQuestion} className="btn btn-primary mb-3">
        Add Question
      </button>

      {showNewQuestionEditor && (
      <>
        <select value={newQuestion.type} onChange={handleTypeChange} className="form-control mb-3">
          <option value="multipleChoice">Multiple Choice</option>
          <option value="trueFalse">True/False</option>
          <option value="fillInBlanks">Fill in the Blanks</option>
        </select>

        {renderEditor(newQuestion)}
      </>
    )}

      <h4>Existing Questions</h4>
      {/* Render all the existing questions with their respective editors */}
      {quizDetails.questions.map((question: any, index: number) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h5>Question {index + 1}</h5>

          {/* Dropdown for changing the type of an existing question */}
          <select
            value={question.type}
            onChange={(e) => {
              const newType = e.target.value;
              const updatedQuestions = [...quizDetails.questions];
              updatedQuestions[index] = { ...updatedQuestions[index], type: newType };
              setQuizDetails((prev: any) => ({ ...prev, questions: updatedQuestions }));
            }}
            className="form-control mb-3"
          >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="trueFalse">True/False</option>
            <option value="fillInBlanks">Fill in the Blanks</option>
          </select>

          {/* Render the appropriate editor for the existing question */}
          {renderEditor(question, index)}
        </div>
      ))}
    </div>
  );
}
