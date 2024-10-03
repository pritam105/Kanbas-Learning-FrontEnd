import { Link } from "react-router-dom";
export default function AssignmentEditor() {
    return (
    <div>
      <div id="wd-assignments-editor"
           className="d-flex align-items-center min-vh-100">
      <div className="col-md-9">
        <div className="row mb-1 text-end">
          <label className="col-sm-2 me-3 col-form-label"></label>
              Assignment Name
        </div>
        <div className="row mb-3 text-end">
          <label htmlFor="wd-name" className="col-sm-2 col-form-label"></label>    
          <div className="col-sm-10">
            <input id="wd-name" className="form-control" value="A1" />
          </div>
        </div>
        <div className="row mb-3 text-end">
          <label htmlFor="wd-description" className="col-sm-2 col-form-label"></label>
          <div className="col-sm-10">
            <textarea id="wd-description" className="form-control" rows={8}>
              The assignment is available online Submit a link to the landing page to the web application running on Netlify.
              The landing page should include the following:
              Your full name and section
              Links to each of the lab assignments
              Link to the Kanbas application
              Links to all relevant source code repositories
              The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
          </div>
        </div>
        
        {/* Points and Assignment Group */}
        <div className="row mb-3 text-end">
          <label htmlFor="wd-points" className="col-sm-4 col-form-label">Points</label>
          <div className="col-sm-8">
            <input id="wd-points" className="form-control" value={100} />
          </div>
        </div>

        <div className="row mb-3 text-end">
          <label htmlFor="wd-group" className="col-sm-4 col-form-label">Assignment Group</label>
          <div className="col-sm-8">
            <select id="wd-group" className="form-control">
              <option value="Quiz">Quiz</option>
              <option value="Tests">Test</option>
              <option selected value="Assignments">Assignments</option>
            </select>
          </div>
        </div>

        {/* Display Grade and Submission Type */}
        <div className="row mb-3 text-end">
          <label htmlFor="wd-display-grade-as" className="col-sm-4 col-form-label">Display Grade as</label>
          <div className="col-sm-8">
            <select id="wd-display-grade-as" className="form-control">
              <option value="RawScore">Raw Score</option>
              <option value="Class">Class</option>
              <option selected value="Percentage">Percentage</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-submission-type" className="col-sm-4 col-form-label text-end">Submission Type</label>
          <div className="col pt-2 border rounded-2 me-3 ms-3">
            <select id="wd-submission-type" className="form-control">
              <option value="Offline">Offline</option>
              <option selected value="Online">Online</option>
            </select>

            <div className="d-flex justify-content-start m-2 ms-1">Online Entry Options</div>

            <div className="col-sm-8">
              <div className="form-check">
                <input type="checkbox" id="wd-text-entry" className="form-check-input" />
                <label htmlFor="wd-text-entry" className="form-check-label">
                  Text Entry</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked />
                <label htmlFor="wd-website-url" className="form-check-label ms-2">Website URL</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
                <label htmlFor="wd-media-recordings" className="form-check-label ms-2">Media Recordings</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
                <label htmlFor="wd-student-annotation" className="form-check-label ms-2">Student Annotation</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-file-upload" className="form-check-input" />
                <label htmlFor="wd-file-upload" className="form-check-label ms-2">File Uploads</label>
              </div>
            </div>            
          </div>
        </div>

        {/* Assign to and Due Date */}
        <div className="row mb-3">
          <label htmlFor="wd-assign-to" className="col-sm-4 col-form-label text-end">Assign</label>
          <div className="col pt-2 border rounded-2 me-3 ms-3">
            <label htmlFor="wd-assign-to" className="col-form-label m-2 ms-1 mb-0 fw-bold">Assign to</label>
            <input id="wd-assign-to" className="form-control" value="Everyone" readOnly />
            
            <label htmlFor="wd-due-date" className="col-form-label m-2 ms-1 mb-0 fw-bold">Due</label>
            <input type="date" id="wd-due-date" className="form-control" defaultValue="2024-09-21" />
            
            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="wd-available-from" className="col-form-label m-2 ms-1 mb-0 fw-bold">Available From</label>
                <input type="date" id="wd-available-from" className="form-control" defaultValue="2024-09-21" />
              </div>
              <div className="col-sm-6">
                <label htmlFor="wd-available-to" className="col-form-label m-2 ms-1 mb-0 fw-bold"> Until</label>
                <input type="date" id="wd-available-to" className="form-control" defaultValue="2024-09-21" />
              </div>
            </div>
          </div>
        </div>
        <hr/>
        {/* Save and Cancel Buttons */}
        <div className="d-flex justify-content-end mt-3">
          <Link to="/Kanbas/Courses/1234/Assignments" className="btn btn-light me-2" id="wd-course-assignment-link">Cancel</Link>
          <Link to="/Kanbas/Courses/1234/Assignments" className="btn btn-success btn-danger" id="wd-course-assignment-link">Save</Link>
        </div>
        </div>
      </div>
  </div>
  );}
  