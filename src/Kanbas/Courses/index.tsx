import { FaAlignJustify } from "react-icons/fa6";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/editor";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import PeopleTable from "./People/table";
import { useEffect, useState } from "react";
import * as courseClient from "../Courses/client";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreviewScreen from "./Quizzes/QuizPreview";
import QuizAttemptResultsScreen from "./Quizzes/QuizAttemptResultsScreen";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);
  const [users, setUsers] = useState();

  const fetchUsersForCourse = async () => {
    if (cid) {
      const usersForCourse = await courseClient.findUsersForCourse(cid);
      setUsers(usersForCourse);
    }
  };

  useEffect( () => {
    fetchUsersForCourse();
  }, []);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}  &gt; {pathname.split("/")[4]}
      </h2> 
      <hr />
      <div className="d-flex">
            <CoursesNavigation />
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Piazza" element={<h3>Piazza</h3>}/>
            <Route path="Zoom" element={<h3>Zoom</h3>}/>
            <Route path="Grades" element={<h3>Grades</h3>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:aid" element={<AssignmentEditor/>} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/Submission" element={<QuizAttemptResultsScreen />} />
            <Route path="Quizzes/Details/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/Preview/:qid" element={<QuizPreviewScreen />} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
);}
