import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizDetails as reduxSetQuizDetails } from './reducer';
import * as quizClient from './client';

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const quiz = useSelector((state: any) => qid ? state.quizzes.quizzes.find((q: any) => q._id === qid) : {});
    const [quiz, setQuiz] = useState<any>();

    const [ attemptVisible, setAttemptVisible ] = useState<any>(false);

    useEffect(() => {
        if (cid && qid) {
            quizClient.fetchQuizDetails(cid, qid)
                .then(details => {
                    console.log("quiz fetched inside useeffect " + JSON.stringify(details));
                    setQuiz(details);
                    dispatch(reduxSetQuizDetails(details));
                })
                .catch(error => console.error('Failed to fetch quiz details:', error));
        }

    }, [cid, qid, dispatch]);

    const getAttempts = async () => {
        if (currentUser.role === "FACULTY") {
            setAttemptVisible(true);
        } else {
            const attempts = await quizClient.getAttemptsForUserAndQuiz(currentUser._id, qid);
            // console.log("users attempts done" + attempts.attemptCount);
            console.log(" allowed attempts for this quiz " + JSON.stringify(quiz));
            if (attempts.attemptCount >= quiz.allowedAttempts) {
                setAttemptVisible(false);
            } else {
                setAttemptVisible(true);
            }
        }
    }

    useEffect(() => {
        if (quiz) {
            getAttempts();
        }
    }, [quiz, currentUser, qid]);

    const handleEdit = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };

    const handleLastAttempt = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Submission`);
    };

    const handlePreview = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/preview/${qid}`);
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }


    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {currentUser.role !== "FACULTY" && attemptVisible ? (
                    <button onClick={handlePreview} className="btn btn-primary mb-3">
                    Attempt Quiz
                    </button>
                    ) : currentUser.role !== "FACULTY" && !attemptVisible ? (
                        <p>You have no more attempts left!</p>
                    ) : (
                        <button onClick={handlePreview} className="btn btn-primary mb-3">
                        Preview
                        </button>
                     )}
                
                {currentUser.role == "FACULTY" && <button onClick={handleEdit} className="btn btn-primary mb-3 ms-3">Edit</button>}
                {currentUser.role == "STUDENT" && <button onClick={handleLastAttempt} className="btn btn-primary mb-3 ms-3">View Last Attempt</button>}
            </div>
            <hr />
            <h2 style={{ textAlign: 'center' }}>{quiz.title}</h2>
            <hr />
            <br />
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {[
                        ["Quiz Type", quiz.quizType],
                        ["Points", quiz.points],
                        ["Assignment Group", quiz.assignmentGroup],
                        ["Shuffle Answers", quiz.shuffleAnswers ? 'Yes' : 'No'],
                        ["Time Limit", `${quiz.timeLimit} minutes`],
                        ["Allowed Attempts", quiz.allowedAttempts ],
                        ["Show Correct Answers", quiz.showCorrectAnswers],
                        ["Access Code", quiz.accessCode],
                        ["One Question at a Time", quiz.oneQuestionAtATime ? 'Yes' : 'No'],
                        ["Webcam Required", quiz.webcamRequired ? 'Yes' : 'No'],
                        ["Lock Questions After Answering", quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No']
                    ].map(([label, value]) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                            <strong style={{ textAlign: 'right', width: '50%' }}>{label}:</strong>
                            <span style={{ marginLeft: '10px', textAlign: 'left', width: '50%' }}>{value}</span>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <table style={{ margin: 'auto', border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Due</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>For</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Available From</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{new Date(quiz.dueDate).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Everyone</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{new Date(quiz.availableDate).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{new Date(quiz.untilDate).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
