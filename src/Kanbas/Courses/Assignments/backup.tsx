import { BsGripVertical, BsPlus } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { CiSearch } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <div className="d-inline-flex align-items-center">
          <CiSearch />
          <input
            id="wd-search-assignment"
            className="ml-3"
            placeholder="Search..."/>
        </div>
        <button id="wd-add-assignment" className="btn btn-md btn-danger me-1 float-end">+ Assignment</button>
        <button id="wd-add-assignment-group" className="btn btn-md me-1 bg-secondary float-end">+ Group</button>
        <br/>
        <br/>
{/*         
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button>
        </h3> */}
        <ul className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
              <div id = "wd-assignments-title" className="p-3 ps-2 pb-4 bg-secondary"> 
                <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS
                <IoEllipsisVertical className="fs-3 pt-1 float-end" />
                <BsPlus className="fs-2 pt-2 float-end"/>
                <span className="float-end border border-black p-1 rounded-5">40% of Total</span>
              </div>
              <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ms-0 ps-1">
                      <BsGripVertical className="me-3 fs-3" />
                      <TfiWrite className="me-4 fs-3 "/>
                      <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A1 - ENV + HTML
                      </a> <br/>
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am |
                      <br/><b>Due</b> May 13 at 11:59pm | 100 pts
                  <LessonControlButtons/>
                </li>
                <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ms-0 ps-1">
                  <div className="d-inline-flex">
                    <div className="align-self-center">
                      <BsGripVertical className="me-3 fs-3" />
                      <TfiWrite className="me-4 fs-3 "/>
                    </div>
                    <div>
                      <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A2 - ENV + HTML
                      </a> <br/>
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am |
                      <br/><b>Due</b> May 20 at 11:59pm | 100 pts
                    </div>
                  </div>
                  <LessonControlButtons/>
                </li>
                <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ms-0 ps-1">
                  <div className="d-inline-flex">
                    <div className="align-self-center">
                      <BsGripVertical className="me-3 fs-3" />
                      <TfiWrite className="me-4 fs-3 "/>
                    </div>
                    <div>
                      <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A3 - ENV + HTML
                      </a> <br/>
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am |
                      <br/><b>Due</b> May 27 at 11:59pm | 100 pts
                    </div>
                  </div>
                  <LessonControlButtons/>
                </li>
              </ul>
          </li>
        </ul>
      </div>
  );}
  