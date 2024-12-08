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
  // const [question, setQuestion] = useState<QuestionData>({
  //   title: '',
  //   points: 1,
  //   questionText: '',
  //   correctAnswers: [{ text: '' }]
  // });

  const handleAnswerChange = (index: number, value: string) => {
    // let newAnswers = question.correctAnswers.map((answer, i) => {
    //   if (i === index) {
    //     return { ...answer, text: value };
    //   }
    //   return answer;
    // });
    // setQuestion({ ...question, correctAnswers: newAnswers });

    const newAnswers = [...question.correctAnswers];
    newAnswers[index] = value; // directly assign the string
    setQuestion({ ...question, correctAnswers: newAnswers });
  };

  const addAnswer = () => {
    // setQuestion({ ...question, correctAnswers: [...question.correctAnswers, { text: '' }] });
    setQuestion({ ...question, correctAnswers: [...question.correctAnswers, ''] }); // add empty string
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
      />
      <h4>pts:</h4>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Points"
        value={question.points}
        onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value, 10) })}
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
          />
          <br/>
          <button onClick={() => removeAnswer(index)} className="text-danger me-4">
            <FaTrash />
          </button>
        </div>
      ))}
      <div className="mt-3">
        <button className="btn btn-sm btn-secondary "onClick={addAnswer}>Add Answer</button>
        <button className="btn btn-sm btn-success ms-2" onClick={() => onSave(question)}>Save</button>
        <button className="btn btn-sm btn-danger ms-2" onClick={onCancel}>Cancel</button>
      </div>
      <br/>
    </div>
  );
}

export default FillInBlanksEditor;
