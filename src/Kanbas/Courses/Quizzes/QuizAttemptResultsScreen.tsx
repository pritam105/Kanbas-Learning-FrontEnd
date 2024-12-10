import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './QuizPreview/MultipleChoiceQuestion';
import TrueFalseQuestion from './QuizPreview/TrueFalseQuestion';
import FillInBlanksQuestion from './QuizPreview/FillInBlanksQuestion';
import * as quizClient from "./client";
import { useSelector } from "react-redux";

export interface QuestionProps {
  question: Question;
  answer: any;
  isCorrect: boolean;  // New prop to indicate correctness
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

function QuizAttemptResultsScreen() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<any>([]);
  const [correctAnswers, setCorrectAnswers] = useState<any>({});
  const [score, setScore] = useState(0);
  const [timestamp, setTimestamp] = useState<any>();  // To store timestamp
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userId = currentUser._id;
  const [ attemptCount, setAttemptCount ] = useState();

  const getQuizData = async () => {
    if (!cid || !qid) return;
    try {
      const quizData = await quizClient.fetchQuizDetails(cid, qid);
      setQuiz(quizData);
      
      // Fetch attempt data for the user
      const attemptData = await quizClient.getAttemptsForUserAndQuiz(userId, qid); // Assume this API fetches user attempt data
      setUserAnswers(attemptData.answers);  // Store user's answers
      setAttemptCount(attemptData.attemptCount);

      const initialCorrectAnswers: AnswerMap = {};
      quizData.questions.forEach((question: any) => {
        if (question.type === 'multipleChoice') {
          // For MCQ, set correct answer based on the 'isCorrect' flag
          initialCorrectAnswers[question._id] = question.choices.find((choice: any) => choice.isCorrect)?.text || '';
        } else if (question.type === 'trueFalse') {
          // For True/False, the correct answer is based on the 'isTrue' value
          initialCorrectAnswers[question._id] = question.isTrue ? 'true' : 'false';
        } else if (question.type === 'fillInBlanks') {
          // For Fill-in-the-blanks, correct answers are a list
          initialCorrectAnswers[question._id] = question.correctAnswers.join(':: ');
        }
      });
      console.log("correct answers from useeffect:" + JSON.stringify(initialCorrectAnswers));
      setCorrectAnswers(initialCorrectAnswers);
      setTimestamp(attemptData.timestamp);
      
      // Calculate score
      let totalScore = 0;
      quizData.questions.forEach((question: any) => {
        const ans = attemptData.answers.find((ans: any) => ans.questionId === question._id);
        if (initialCorrectAnswers[question._id].includes("::")) {
            if (initialCorrectAnswers[question._id].includes(ans.answer)) {
                totalScore += question.points || 1;      
            }
        } else if (ans.answer === initialCorrectAnswers[question._id]) {
          totalScore += question.points || 1;
        }
      });
      setScore(totalScore);
    } catch (error) {
      console.error('Failed to fetch quiz data:', error);
    }
  };

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuestionResult = (questionId: string) => {
    console.log("Correct answers from state variable: " + JSON.stringify(correctAnswers));
    console.log("User answers: " + JSON.stringify(userAnswers));
    
    if (!userAnswers.length || !Object.keys(correctAnswers).length) {
        return { isCorrect: false };  // Early return if answers or correctAnswers are not ready yet
    }
  
    const userAnswer = userAnswers.find((ans: any) => ans.questionId === questionId);

    if (userAnswer && correctAnswers[questionId].includes("::")) {
        if (correctAnswers[questionId].includes(userAnswer.answer)) return {isCorrect: true};
        else return { isCorrect: false};

    } else if (userAnswer && userAnswer.answer === correctAnswers[questionId]) {
        return { isCorrect: true};
    } else return { isCorrect: false};
  };

  const shouldDisplayCorrectAnswers = (questionId: string) => {
    // const userAttempt = userAnswers.find((attempt: any) => attempt.questionId === questionId);
    
    if (!attemptCount || !quiz) return false;

    if (currentUser.role === 'FACULTY') {
      // Faculty: Show correct answers if the showCorrectAnswers flag is true
      return quiz.showCorrectAnswers;
    } else {
      const isLastAttempt = attemptCount === quiz.allowedAttempts;
      return isLastAttempt && quiz.showCorrectAnswers;
    }
  };

  if (!quiz) return <p>Loading...</p>;

//   if (!quiz || !Object.keys(correctAnswers).length || !userAnswers.length) {
//     return <p>Loading...</p>;  // Show loading while data is being fetched
//   }

  return (
    <div>
      <h1>{quiz.title} - Attempt Results</h1>
      <p>Your score: {score} / {quiz.questions.reduce((acc: number, q: any) => acc + (q.points || 1), 0)}</p>
      {quiz.questions.map((question: any) => {
        let QuestionComponent = null;
        const { isCorrect } = getQuestionResult(question._id); // Get result for each question
        // console.log("isCorrect: " + isCorrect);
        const showCorrectAnswer = shouldDisplayCorrectAnswers(question._id);
        console.log("showCorrectAnswer flag: " + showCorrectAnswer);
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
        const userAnswer = userAnswers.find((ans: any) => ans.questionId === question._id);

        return QuestionComponent && (
          <div key={question._id} className={`result-container ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
            <QuestionComponent
              question={question}
              answer={userAnswer ? userAnswer.answer : ''}
              isCorrect={isCorrect}
            />
            <div className="card-footer">
              <h6>{isCorrect ? 'Correct!' : 'Wrong Answer!'}</h6>
              <h6>Your Answer: {userAnswer ? userAnswer.answer : 'N/A'}</h6>
              {showCorrectAnswer && !isCorrect && (
              <div className="correct-answer">
                <h6>Correct Answer(s): {correctAnswers[question._id]}</h6>
              </div>
            )}
            </div>
          </div>
        );
      })}
      <div className="mt-4">
        <h5>Attempt Timestamp: {new Date(timestamp).toLocaleString()}</h5>
      </div>
    </div>
  );
}

export default QuizAttemptResultsScreen;
