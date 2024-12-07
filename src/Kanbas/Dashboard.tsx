import { Link } from "react-router-dom";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as db from "./Database";
import ProtectedFacultyRoute from "./Account/ProtectedFacultyRoute";
import ProtectedStudentRoute from "./Account/ProtectedStudentRoute";
import { unenroll, enroll }  from "./reducer";

export default function Dashboard({ 
    courses, 
    course, 
    setCourse, 
    addNewCourse,
    deleteCourse, 
    updateCourse,
    enrolling, 
    setEnrolling, 
    updateEnrollment}: 
    {
    courses: any[]; 
    course: any; 
    setCourse: (course: any) => void;
    addNewCourse: () => void; 
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean; setEnrolling: (enrolling: boolean) => void; 
    updateEnrollment: (courseId: string, enrolled: boolean) => void; }) {

    return (
        <div id="wd-dashboard">
            <div className="d-flex">
                <h1 id="wd-dashboard-title" className="flex-grow-1">Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
                </h1>
           </div>
           <hr />
           <ProtectedFacultyRoute>
                <h5>New Course
                <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse} > Add </button>
                <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
                    Update
                </button>
                </h5>
                <br />
                <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
                <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
                <hr />
            </ProtectedFacultyRoute>
          <h2 id="wd-dashboard-published" className="ps-4">Published Courses ({courses.length})</h2>
            <div id="wd-dashboard-courses" className="row ps-4">
                <hr />
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    
                    {courses
                        .map((course: any) => 
                        (<div className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                    <img src={course.logo} width="100%" height={160}/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description} 
                                        </p>
                                        { course.enrolled &&
                                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                            to={`/Kanbas/Courses/${course._id}/Home`}>
                                            <button className="btn btn-primary btn-sm"> Go </button>
                                        </Link>}
                                        {enrolling && (
                                        <button  onClick={(event) => {
                                                    event.preventDefault();
                                                    updateEnrollment(course._id, !course.enrolled);
                                                }}
                                                className={`btn btn-sm ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                                            {course.enrolled ? "Unenroll" : "Enroll"}
                                        </button>
                                        )}
                                        { course.enrolled && 
                                        <ProtectedFacultyRoute>
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                                }} className="btn btn-danger me-2 float-end btn-sm"
                                                id="wd-delete-course-click">
                                                Delete
                                            </button>
                                            <button id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end btn-sm" >
                                                Edit
                                            </button>
                                        </ProtectedFacultyRoute>}
                                    </div>
                            </div>
                        </div>
                        ))
                    }
                </div>                                       
          </div>
        </div>
    );    
}