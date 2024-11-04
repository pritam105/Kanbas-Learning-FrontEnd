import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    return (
      <div>
        <ModulesControls/> 
        <br/><br/><br/>
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />  
                Week 1
              <ModuleControlButtons/>
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title">
                  <BsGripVertical className="me-2 fs-3" />
                   LEARNING OBJECTIVES
                  <LessonControlButtons /></span>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  READING
                <LessonControlButtons /></span>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  SLIDES
                <LessonControlButtons /></span>
              </li>
            </ul>
          </li>
          
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />  
                Week 2
              <ModuleControlButtons/>
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title">
                  <BsGripVertical className="me-2 fs-3" />
                   LEARNING OBJECTIVES
                  <LessonControlButtons /></span>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  READING
                <LessonControlButtons /></span>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                  SLIDES
                <LessonControlButtons /></span>
              </li>
            </ul>
          </li>          
        </ul>
      </div>
  );}
  