import { BsGripVertical, BsPlus } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { CiSearch } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const assignments = db.assignments;
  const {cid} = useParams();

    return (
      <div id="wd-assignments">
        <div className="d-inline-flex align-items-stretch">
          <span className="input-group-text border border-end-0 rounded-0 bg-white"><CiSearch className="fs-4"/></span>
          <input
            id="wd-search-assignment"
            type="search"
            className="form-control ml-3 border-start-0 border rounded-0 rounded-left"
            placeholder="Search..."/>
        </div>
        <button id="wd-add-assignment" className="btn btn-md btn-danger me-1 float-end">+ Assignment</button>
        <button id="wd-add-assignment-group" className="btn btn-md me-1 bg-secondary float-end">+ Group</button>
        <br/>
        <br/>

        <ul className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
              <div id = "wd-assignments-title" className="p-3 ps-2 pb-4 bg-secondary"> 
                <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS
                <IoEllipsisVertical className="fs-3 pt-1 float-end" />
                <BsPlus className="fs-2 pt-2 float-end"/>
                <span className="float-end border border-black p-1 rounded-5">40% of Total</span>
              </div>
              <ul id="wd-assignment-list" className="list-group rounded-0">
              {assignments
                .filter(assignment =>  assignment.course == cid)
                .map(assignment =>
                  <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ms-0 ps-1">
                    <div className="d-inline-flex">
                      <div className="align-self-center">
                        <BsGripVertical className="me-3 fs-3" />
                        <TfiWrite className="me-4 fs-3 "/>
                      </div>
                      <div>
                        <a className="wd-assignment-link"
                          href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                          {assignment._id}- {assignment.title}
                        </a> <br/>
                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am |
                        <br/><b>Due</b> May 13 at 11:59pm | 100 pts
                      </div>
                    </div>
                    <LessonControlButtons/>
                  </li> 
                )}
              </ul>
          </li>
        </ul>
      </div>
  );}
  