import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as quizClient from "./client";
import { setQuizzes, deleteQuiz as reduxDeleteQuiz } from './reducer';
import { MdArrowDropDown } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import GreenCheckmark from './GreenCheckMark';
import RedBan from './RedBan';

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quizzes = useSelector((state: any) => state.quizzes.quizzes.filter((q: any) => q.course === cid));
  const [attemptDataMap, setAttemptDataMap] = useState<any>({});

  useEffect(() => {
    const loadQuizzes = async () => {
      if (cid) {
        const quizzesData = await quizClient.fetchQuizzesForCourse(cid);
        const filteredQuizzes = currentUser.role === 'STUDENT' 
        ? quizzesData.filter((quiz: any) => quiz.published) 
        : quizzesData;

      dispatch(setQuizzes(filteredQuizzes));
      
      const attemptData: any = {};
      for (const quiz of filteredQuizzes) {
        const userAttempt = await quizClient.getAttemptsForUserAndQuiz(currentUser._id, quiz._id);
        attemptData[quiz._id] = userAttempt; // Store the attempt data for each quiz
      }
      setAttemptDataMap(attemptData);
      }
    };
    loadQuizzes();
  }, [cid, dispatch]);

  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };

  const handleDelete = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(reduxDeleteQuiz(quizId));
  };

  const formatDateForInput = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  };

  const handleEdit = (quizId: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Details/${quizId}`);
  };
  
  const togglePublishStatus = async (quizId: string, isPublished: boolean) => {
    if (!cid) {
      console.error('Course ID is undefined');
      return;
    }
    if (isPublished) {
      await quizClient.unpublishQuiz(quizId);
    } else {
      await quizClient.publishQuiz(quizId);
    }
    const quizzesData = await quizClient.fetchQuizzesForCourse(cid);
    dispatch(setQuizzes(quizzesData));
  };

  const getQuizAvailability = (availableDate: string, untilDate: string) => {
    const currentDate = new Date();
    const available = new Date(availableDate);
    const until = new Date(untilDate);

    if (currentDate > until) {
      return 'Closed';
    } else if (currentDate >= available && currentDate <= until) {
      return 'Available';
    } else {
      return `Not Available Until ${formatDateForInput(availableDate)}`;
    }
  };

  const getLastAttemptScore = (quizId: string, quizPoints: number) => {
    const attemptData = attemptDataMap[quizId];
    if (!attemptData) return '-- / ' + (quizPoints || 0); // No attempt yet

    const { attemptCount, score } = attemptData;
    if (attemptCount === 0) {
      return `-- / ${quizPoints || 0}`; // No attempt made yet
    } else {
      return `${score} / ${quizPoints || 0}`; // Show score from last attempt
    }
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between mb-2">
        <input type="text" className="form-control" placeholder="Search for Quiz" style={{ maxWidth: '300px' }} />
        <div>
          { currentUser.role === "FACULTY" && <button onClick={handleAddQuiz} className="btn btn-lg btn-danger me-1">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> Add Quiz
          </button>}
          {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <IoEllipsisVertical className="position-relative" style={{ fontSize: '30px' }} />
            </button> */}
            {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#" onClick={() => handleDeleteAll()}>Delete All Quizzes</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handlePublishAll(true)}>Publish All</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handlePublishAll(false)}>Unpublish All</a></li>
            </ul> */}
        </div>
      </div>
      <hr />
      <br/>
        <ul id="wd-modules" className="list-group rounded-0">
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <MdArrowDropDown className="me-1 fs-3" />
        Assignment Quizzes
        </div>
        <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
        {quizzes.map((quiz: any) => {
          const availability = getQuizAvailability(quiz.availableDate, quiz.untilDate);
          const lastAttemptScore = getLastAttemptScore(quiz._id, quiz.points);

          return (
          <li key={quiz._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
            <div className="icon-container me-2">
              <IoRocketOutline className="text-success fs-3" />
            </div>
            <div className="quiz-details flex-grow-1">
              <strong>
              {(currentUser.role === 'FACULTY' || !availability.includes('Not Available Until') && availability !== 'Closed') ? (
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/Details/${quiz._id}`} className="wd-_id">
                {quiz.title}
              </Link>
                ) : (
                  <span>{quiz.title}</span>  // Display as plain text
                )}
              </strong>
              <h6>
                <p className="wd-fg-color-red">
                  {/* <span className="wd-fg-color-black"> <b>Available From</b> {formatDateForInput(quiz.availableDate) || 'N/A'} | <b>Due</b> {formatDateForInput(quiz.dueDate) || 'No Due Date'} | {quiz.points || 0} pts</span> */}
                  <span className="wd-fg-color-black">
                      <b>{getQuizAvailability(quiz.availableDate, quiz.untilDate)}</b> | 
                      <b> Due Date:</b> {formatDateForInput(quiz.dueDate) || 'No Due Date'} | 
                        {quiz.questions?.length || 0} <b>Questions</b> | 
                        {lastAttemptScore} pts
                  </span>
                </p>
              </h6>
            </div>
            <div className="d-flex align-items-center">
            {quiz.published ? <GreenCheckmark /> : <RedBan />}
              {currentUser.role === "FACULTY" && <div className="dropdown">
                <button className="btn dropdown-toggle " type="button" id="quizMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <IoEllipsisVertical style={{ fontSize: '20px' }} />
                </button>
                
                <ul className="dropdown-menu" aria-labelledby="quizMenuButton">
                 <li>
                    <a className="dropdown-item" 
                       onClick={() => handleEdit(quiz._id)}>Edit</a>
                </li>
                <li>
                    <a className="dropdown-item" 
                       href={`#/Kanbas/Courses/${cid}/Quizzes`} 
                       onClick={() => handleDelete(quiz._id)}>Delete</a>
                </li>
                <li>
                    <a className="dropdown-item" 
                       href={`#/Kanbas/Courses/${cid}/Quizzes`} 
                       onClick={() => togglePublishStatus(quiz._id, quiz.published)}
                      >
                      {quiz.published ? 'Unpublish' : 'Publish'}</a>
                </li>
                </ul>
             </div>}
            </div>
          </li>
        )})}
      </ul>
      </li>
      </ul>
    </div>
  );
}
