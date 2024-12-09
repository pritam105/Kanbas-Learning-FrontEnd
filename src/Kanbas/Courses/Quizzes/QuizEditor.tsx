import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as quizClient from "./client";
import { setQuizDetails as reduxSetQuizDetails } from './reducer';
import QuestionEditor from './QuestionEditor';
import ReactQuill from 'react-quill';

function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state:any) => {
        if (qid !== "new") {
            return state.quizzes.quizzes.find((q:any) => q._id === qid);
        } else {
            return {};
        }
    });

  const [quizDetails, setQuizDetails] = useState({
    _id: `quiz-${Date.now()}`,
    title: '',
    description: '',
    quizType: 'Graded Quiz',
    assignmentGroup: 'Quizzes',
    shuffleAnswers: false,
    timeLimit: 20,
    allowedAttempts: 1,
    showCorrectAnswers: '',
    accessCode: '',
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: '',
    availableDate: '',
    untilDate: '',
    published: false,
    questions: []
  });

  useEffect(() => {
    if (cid && qid !== "new") {
        quizClient.fetchQuizDetails(cid, qid!).then(details => {
        dispatch(reduxSetQuizDetails(details));
        setQuizDetails(details);
      }).catch(error => console.error('Failed to fetch quiz details:', error));
    }
  }, [cid, qid, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuizDetails(prev => ({ ...prev, [name]: value }));
  };

  // const handleSave = async (publish: boolean) => {
  //   setQuizDetails((prev) => ({
  //     ...prev,
  //     published: publish,
  //   }));
  //   let createdQuiz;

  //   if (qid !== "new") {
  //     // console.log("logging quiz details " + quizDetails);
  //     await quizClient.updateQuizDetails(qid as string, quizDetails);
  //   } else {
  //     createdQuiz = await quizClient.createQuiz(cid as string, quizDetails);
  //   }
  //   if (publish) {
  //     navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  //   } else {
  //     if (qid === "new") {
  //       navigate(`/Kanbas/Courses/${cid}/Quizzes/Details/${createdQuiz._id}`);
  //     } else {
  //       navigate(`/Kanbas/Courses/${cid}/Quizzes/Details/${qid}`);
  //     }
  //   }
  // };


  const handleSave = async (publish: boolean) => {
    let savedQuiz;
    if (qid !== "new") {
      // console.log("logging quiz details " + quizDetails);
      await quizClient.updateQuizDetails(qid as string, quizDetails);
      if (publish) {
        await quizClient.publishQuiz(qid as string);
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } else {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/Details/${qid}`);
      }
    } else {
      savedQuiz = await quizClient.createQuiz(cid as string, quizDetails);
      if (publish) {
        await quizClient.publishQuiz(savedQuiz._id);
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } else {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/Details/${savedQuiz._id}`);
      }
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const [activeTab, setActiveTab] = useState('detail');

  return (
    <div className="col-12" style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 0",
        padding: "20px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      }}>
      <div className="nav nav-tabs">
        <button className={`nav-link ${activeTab === 'detail' ? 'active' : ''}`}
                onClick={() => setActiveTab('detail')}>Details</button>
        <button className={`nav-link ${activeTab === 'question' ? 'active' : ''}`}
                onClick={() => setActiveTab('question')}>Questions</button>
      </div>
      <br/>
      {activeTab === 'detail' && (
        <>
          <input type="text" name="title" value={quizDetails.title}
                 onChange={handleChange} className="form-control mb-2" placeholder="Unnamed Quiz" />
          <ReactQuill theme="snow" value={quizDetails.description} className="mb-2"
                      onChange={() => handleChange} />
          <br/>
          <br/>
          <br/>
          <label>Quiz Type</label>
          <select name="quizType" value={quizDetails.quizType} onChange={handleChange}
                  className="form-select">
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>

          <br/>
          <label>Assignment Group</label>
          <select name="assignmentGroup" value={quizDetails.assignmentGroup} onChange={handleChange}
                  className="form-select">
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Projects">Projects</option>
          </select>
          <br/>
          
          <h5>Options</h5>
          <div className="form-check">
                <input type="checkbox" id="shuffle" 
                       onChange={(e) => setQuizDetails({ ...quizDetails, shuffleAnswers: e.target.checked })} 
                       className="form-check-input" defaultChecked={quizDetails.shuffleAnswers} />
                <label htmlFor="shuffle" className="form-check-label ms-2"> Shuffle Answers</label>
          </div>
          <br/>
          {/* <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <label>Shuffle Answers</label>
          <input type="checkbox"  name="shuffleAnswers" checked={quizDetails.shuffleAnswers}
                 onChange={(e) => setQuizDetails({ ...quizDetails, shuffleAnswers: e.target.checked })} /></div> */}

          <label>Time Limit (minutes)</label>
          <input type="number" name="timeLimit" value={quizDetails.timeLimit}
                 onChange={handleChange} className="form-control mb-2" placeholder="Time Limit (minutes)" />
          
          <label>Attempts Allowed</label>
          <input type="number" name="allowedAttempts" value={quizDetails.allowedAttempts}
                 onChange={handleChange} className="form-control mb-2" />

          <label>Access Code</label>
          <input type="text" name="accessCode" 
                 onChange={handleChange} className="form-control mb-2" value={quizDetails.accessCode} />
          <br/>

          <label>One Question at a Time</label>
          <select name="oneQuestionAtATime" value={quizDetails.oneQuestionAtATime ? "true" : "false"} onChange={handleChange}
                  className="form-select">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br/>

          <label>Webcam Required</label>
          <select name="webcamRequired" value={quizDetails.webcamRequired ? "true" : "false"} onChange={handleChange}
                  className="form-select">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <br/>

          <label>Lock Questions After Answering</label>
          <select name="lockQuestionsAfterAnswering" value={quizDetails.lockQuestionsAfterAnswering ? "true" : "false"} onChange={handleChange}
                  className="form-select">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          {/* <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <label>Allow Multiple Attempts</label>
          <input type="checkbox" name="multipleAttempts" checked={quizDetails.multipleAttempts}
                 onChange={(e) => setQuizDetails({ ...quizDetails, multipleAttempts: e.target.checked })} /></div> */}

          <div className="mb-3 row">
        <label htmlFor="assign-group" className="mt-4 col-sm-4 col-form-label text-end">Assign</label>

        <div className="mt-4 col-sm-8" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h5>Assign to</h5>
          <input type="text" className="form-control" value="Everyone" readOnly /><br />
          <h5>Due</h5>  
          <input type="datetime-local" className="form-control" name="dueDate" value={quizDetails.dueDate} onChange={handleChange} /><br />
          <div className="row">
            <div className="col-sm-6">
              <h5>Available from</h5>
              <input type="datetime-local" className="form-control" name="availableDate" value={quizDetails.availableDate} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <h5>Until</h5>
              <input type="datetime-local" className="form-control" name="untilDate" value={quizDetails.untilDate} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
        </>
      )}
      {activeTab === 'question' && (
        <div>
          {/* Pass the quizDetails and setter to QuestionEditor */}
          <QuestionEditor
            quizDetails={quizDetails} 
            setQuizDetails={setQuizDetails} 
          />
        </div>
      )}
      <div className="float-end">
        <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        <button onClick={() => handleSave(false)} className="btn btn-danger ms-2">Save</button>
        <button onClick={() => handleSave(true)} className="btn btn-danger ms-2">Save & Publish</button>
      </div>
    </div>
  );
}

export default QuizEditor;
