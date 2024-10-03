import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
          <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
          <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactLogo.png" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1234 React JS
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Full Stack software developer
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/ML.jpg" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1235 ML
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Machine Learning
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/designpatterns.jpg" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1236 Design Patterns
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Design Patterns
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/nlp.webp" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1237 NLP
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        NLP
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/cyber.jpg" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1238 CyberSecurity
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        CyberSecurity
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/algo.jpg" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1239 Algorithms
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Algorithms
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                    to="/Kanbas/Courses/1234/Home">
                                <img src="/images/dl.png" width="100%" height={160}/>
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1230 Deep Learning
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Deep Learning
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>                                       
          </div>
        </div>
    );    
}