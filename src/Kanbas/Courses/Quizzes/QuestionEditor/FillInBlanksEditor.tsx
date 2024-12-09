import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaTrash } from "react-icons/fa";

interface FillInBlanksEditorProps {
  question: QuestionData; // Add this line
  onSave: (questionData: any) => void;
  onCancel: () => void;
}

interface Answer {
  text: string;
}

interface QuestionData {
  title: string;
  points: number;
  questionText: string;
  correctAnswers: string[];
}

function FillInBlanksEditor({ question: initialQuestion, onSave, onCancel }: FillInBlanksEditorProps) {
  const [question, setQuestion] = useState<QuestionData>(initialQuestion);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode

  const handleEdit = () => {
    setIsEditMode(true); // Switch to edit mode
  };

  const handleSave = () => {
    onSave(question); // Call the onSave function passed as a prop
    setIsEditMode(false); // Exit edit mode
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...question.correctAnswers];
    newAnswers[index] = value;
    setQuestion({ ...question, correctAnswers: newAnswers });
  };

  const addAnswer = () => {
    setQuestion({ ...question, correctAnswers: [...question.correctAnswers, ''] });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = question.correctAnswers.filter((_, i) => i !== index);
    setQuestion({ ...question, correctAnswers: newAnswers });
  };

  return (
    <div>
      <br/>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Question Title"
        value={question.title}
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        disabled = {!isEditMode}
      />
      <h4>pts:</h4>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Points"
        value={question.points}
        onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value, 10) })}
        disabled = {!isEditMode}
      />
      <h4>Question:</h4>
      <ReactQuill theme="snow" value={question.questionText} onChange={(value) => setQuestion({ ...question, questionText: value })} />
      
      {question.correctAnswers.map((answer, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Correct Answer" 
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)} 
            disabled = {!isEditMode}
          />
          <br/>
          <button onClick={() => removeAnswer(index)} className="text-danger me-4">
            <FaTrash />
          </button>
        </div>
      ))}
      <div className="mt-3">
      {!isEditMode ? (
          <button className="btn btn-sm btn-primary ms-2" onClick={handleEdit}>Edit</button>
        ) : (
          <>
          <button className="btn btn-sm btn-secondary "onClick={addAnswer}>Add Answer</button>
          <button className="btn btn-sm btn-success ms-2" onClick={handleSave}>Save</button>
          <button className="btn btn-sm btn-danger ms-2" onClick={onCancel}>Remove</button>
        </>
        )}
      </div>
      <br/>
    </div>
  );
}

export default FillInBlanksEditor;
