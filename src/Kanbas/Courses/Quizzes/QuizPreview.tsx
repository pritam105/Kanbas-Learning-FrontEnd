import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';
import * as quizClient from "./client";
import { useSelector } from "react-redux";

export interface QuestionProps {
  question: Question;
  answer: any;
  onChange: (answer: any) => void;
}

export interface Question {
  id: string;
  title: string;
  questionText: string;
  type: 'multipleChoice' | 'trueFalse' | 'fillInBlanks';
  choices?: Array<{ text: string; isCorrect: boolean }>;
  isTrue?: boolean;
  correctAnswers?: string[];
}

export interface AnswerMap {
  [key: string]: any;
}

function QuizPreviewScreen() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const userId = currentUser._id;

  useEffect(() => {
    const getQuiz = async () => {
      if (!cid || !qid) return;
      try {
        const data = await quizClient.fetchQuizDetails(cid, qid);
        setQuiz(data);

        const initialAnswers: AnswerMap = {};
        data.questions.forEach((question: any) => {
          initialAnswers[question._id] = '';
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    getQuiz();
  }, [cid, qid]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSubmit = async () => {
    if (!userId || !qid) return;
    try {
      const attemptData = {
        userId,
        quizId: qid,
        answers: Object.keys(answers).map(questionId => ({
          questionId,
          answer: answers[questionId]
        }))
      };
      console.log("attempt Data: " + JSON.stringify(attemptData));

      const result = await quizClient.createAttempt(attemptData);

      console.log('Attempt result:', result);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Submission`);
      // alert(`Quiz submitted! Your score is ${result.score}`);
    } catch (error) {
      console.error('Failed to submit quiz attempt:', error);
      alert('Failed to submit your quiz attempt. Please try again.');
    }
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: quiz.description }} />

      {quiz.questions.map((question: any) => {
        let QuestionComponent = null;

        switch (question.type) {
          case 'multipleChoice':
            QuestionComponent = MultipleChoiceQuestion;
            break;
          case 'trueFalse':
            QuestionComponent = TrueFalseQuestion;
            break;
          case 'fillInBlanks':
            QuestionComponent = FillInBlanksQuestion;
            break;
          default:
            return null;
        }

        return QuestionComponent && (
          <QuestionComponent
            key={question._id}
            question={question}
            answer={answers[question._id]}
            onChange={(answer: any) => handleAnswerChange(question._id, answer)}
          />
        );
      })}
      <button className = "btn btn-danger" onClick={handleSubmit}>Submit Quiz</button>
      <button className = "btn btn-secondary ms-2" onClick={handleEdit}>Edit this Quiz</button>
    </div>
  );
}

export default QuizPreviewScreen;
