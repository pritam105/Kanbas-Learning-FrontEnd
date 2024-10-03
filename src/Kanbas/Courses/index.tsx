import { FaAlignJustify } from "react-icons/fa6";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/editor";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./navigation";
import { Navigate, Route, Routes } from "react-router";
import PeopleTable from "./People/table";

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />Course 1234 </h2> 
      <hr />
      <div className="d-flex">
            <CoursesNavigation />
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:aid" element={<AssignmentEditor/>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
);}
