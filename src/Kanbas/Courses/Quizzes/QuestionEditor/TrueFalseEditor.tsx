import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TrueFalseEditorProps {
  question: {
    title: string;
    points: number;
    questionText: string;
    isTrue: boolean;
  }; // Add this line
  onSave: (questionData: any) => void;
  onCancel: () => void;
}

function TrueFalseEditor({ question: initialQuestion, onSave, onCancel }: TrueFalseEditorProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode

  const handleEdit = () => {
    setIsEditMode(true); // Switch to edit mode
  };

  const disableEditMode = () => {
    setIsEditMode(false); // Exit edit mode
  }

  const handleSave = () => {
    onSave(question); // Call the onSave function passed as a prop
    setIsEditMode(false); // Exit edit mode
  };

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        padding: "20px"
      }}>
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
      <ReactQuill
        theme="snow"
        value={question.questionText}
        readOnly = {!isEditMode}
        onChange={(value) => setQuestion({ ...question, questionText: value })}
        className="mb-2"
      />
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="isTrue"
            checked={question.isTrue}
            onChange={() => setQuestion({ ...question, isTrue: true })}
            disabled = {!isEditMode}
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="isTrue"
            checked={!question.isTrue}
            onChange={() => setQuestion({ ...question, isTrue: false })}
            disabled = {!isEditMode}
          />
          <label className="form-check-label">False</label>
        </div>
      </div>
      <div className="mt-3">
      {!isEditMode ? (
          <button className="btn btn-sm btn-primary" onClick={handleEdit}>Edit</button>
        ) : (
          <>
            <button className="btn btn-sm btn-secondary" onClick={disableEditMode}>Cancel</button>
            <button className="btn btn-sm btn-success ms-2" onClick={handleSave}>Save</button>
            <button className="btn btn-sm btn-danger ms-2" onClick={onCancel}>Remove</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TrueFalseEditor;
