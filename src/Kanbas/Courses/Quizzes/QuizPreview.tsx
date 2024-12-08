import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';
import * as quizClient from "./client";

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

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface AnswerMap {
  [key: string]: any;
}

function QuizPreviewScreen() {
//   const { quizId } = useParams<{ quizId?: string }>();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});

  useEffect(() => {
    const getQuiz = async () => {
      if (!cid || !qid) return;
      try {
        const data = await quizClient.fetchQuizDetails(cid, qid);
        setQuiz(data);
        
        const initialAnswers: AnswerMap = {};
        data.questions.forEach((question: any) => {
          initialAnswers[question.id] = '';
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    getQuiz();
  }, [cid, qid]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    console.log("questionId: " + questionId);
    console.log("answer: " + answer);
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
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
    </div>
  );
}

export default QuizPreviewScreen;
