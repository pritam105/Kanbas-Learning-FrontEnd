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
    updateCourse }: 
    {
    courses: any[]; 
    course: any; 
    setCourse: (course: any) => void;
    addNewCourse: () => void; 
    deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {
        
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const dispatch = useDispatch();

    const [showEnrollments, setShowEnrollments] = useState(true);

    const isUserEnrolledInCourse = (courseId: string): boolean => {
        return enrollments.some((enrollment: any) => 
            enrollment.user === currentUser._id && enrollment.course === courseId
        );
    };

    const displayCourses = showEnrollments 
        ? courses.filter(course => isUserEnrolledInCourse(course._id)) 
        : courses;

    const toggleDisplayCourses = () => {
        setShowEnrollments(!showEnrollments);
    };

    return (
        <div id="wd-dashboard">
            <div className="d-flex">
                <h1 id="wd-dashboard-title" className="flex-grow-1">Dashboard</h1>
                {currentUser.role === "STUDENT" && <button onClick = {toggleDisplayCourses} className="btn btn-primary"> Enrollments </button>}
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
                    
                    {displayCourses
                        .map((course: any) => 
                        (<div className="wd-dashboard-course col" style={{ width: "270px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                    <img src={course.logo} width="100%" height={160}/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description} 
                                        </p>
                                        {isUserEnrolledInCourse(course._id) && 
                                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                            to={`/Kanbas/Courses/${course._id}/Home`}>
                                            <button className="btn btn-primary"> Go </button>
                                        </Link>}
                                        <ProtectedStudentRoute>
                                            {isUserEnrolledInCourse(course._id) && 
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                dispatch(unenroll({ userId: currentUser._id, courseId: course._id }));
                                                }} className="btn btn-danger float-end"
                                                id="wd-unenroll-course-click">
                                                UnEnroll
                                            </button>}

                                            {!isUserEnrolledInCourse(course._id) && 
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                dispatch(enroll({ userId: currentUser._id, courseId: course._id }));
                                                }} className="btn btn-success float-end"
                                                id="wd-enroll-course-click">
                                                Enroll
                                            </button>}
                                        </ProtectedStudentRoute>
                                        <ProtectedFacultyRoute>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                            }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </button>
                                        <button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}
                                            className="btn btn-warning me-2 float-end" >
                                            Edit
                                        </button>
                                        </ProtectedFacultyRoute>
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