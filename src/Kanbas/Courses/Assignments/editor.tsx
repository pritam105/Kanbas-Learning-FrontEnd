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
          <Link to="/Kanbas/Courses/1234/Assignments" className="btn btn-success" id="wd-course-assignment-link">Save</Link>
        </div>
        </div>
      </div>
  </div>
        
      // <div id="wd-assignments-editor">
      //   <label htmlFor="wd-name"><b>Assignment Name</b></label><br /><br />
      //   <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      //   <textarea id="wd-description" cols={40} rows={8}>
      //     The assignment is available online Submit a link to the landing page to the web application
      //     running on Netlify. the landing page should include the following: 
      //     The landing page should include the following:
      //       Your full name and section
      //       Links to each of the lab assignments
      //       Link to the Kanbas application
      //       Links to all relevant source code repositories
      //       The Kanbas application should include a link to navigate back to the landing page.
      //   </textarea>
      //   <br />
      //   <table>
      //     <tr>
      //       <td align="right" valign="top">
      //         <label htmlFor="wd-points">Points</label>
      //       </td>
      //       <td>
      //         <input id="wd-points" value={100} />
      //       </td>
      //     </tr>
      //     <br />
      //     <tr>
      //       <td align="right" valign="top">
      //         <label htmlFor="wd-group">Assignments</label>
      //       </td>
      //       <td>
      //           <select id="wd-group">
      //               <option value="Quiz">Quiz</option>
      //               <option value="Tests">Test</option>
      //               <option selected value="Assignments">
      //                   Assignments
      //               </option>
      //           </select>
      //       </td>
      //     </tr>
      //     <br />
      //     <tr>
      //       <td align="right" valign="top">
      //         <label htmlFor="wd-display-grade-as">Display Grade as</label>
      //       </td>
      //       <td>
      //           <select id="wd-display-grade-as">
      //               <option value="RawScore">Raw Score</option>
      //               <option value="Class">Class</option>
      //               <option selected value="Percentage">
      //                   Percentage
      //               </option>
      //           </select>
      //       </td>
      //     </tr>
      //     <br />                   
      //     <tr>
      //       <td align="right" valign="top">
      //         <label htmlFor="wd-submission-type">Submission Type</label>
      //       </td>
      //       <td>
      //           <select id="wd-submission-type">
      //               <option value="Offline">Offline</option>
      //               <option selected value="Online">
      //                   Online
      //               </option>
      //           </select>
      //       </td>
      //     </tr>
      //     <br />
      //     <tr>
      //       <td></td>
      //       <td>
      //           <label>Online Entry Options</label>
      //           <br />
      //           <input type="checkbox" name="check-genre" id="wd-text-entry" />
      //           <label htmlFor="wd-text-entry">Text Entry</label>
      //           <br />
      //           <input type="checkbox" name="check-genre" id="wd-website-url" />
      //           <label htmlFor="wd-website-url">Website URL</label>
      //           <br />      
      //           <input type="checkbox" name="check-genre" id="wd-media-recordings" />
      //           <label htmlFor="wd-media-recordings">Media Recordings</label>
      //           <br />
      //           <input type="checkbox" name="check-genre" id="wd-student-annotation" />
      //           <label htmlFor="wd-student-annotation">Student Annotations</label>                            
      //           <br />
      //           <input type="checkbox" name="check-genre" id="wd-file-upload" />
      //           <label htmlFor="wd-file-upload">File Uploads</label>                            
      //       </td>
      //    </tr>
      //    <br />                   
      //     <tr>
      //       <td align="right" valign="top">
      //         <label htmlFor="wd-assign-to">Assign</label>
      //       </td>
      //       <td>
      //           <label htmlFor="wd-assign-to">Assign to</label>
      //           <br/>
      //           <input id="wd-assign-to" value={"Everyone"} />
      //           <br />
      //           <br />
      //           <label htmlFor="wd-due-date">Due</label> 
      //           <br/>
      //           <input type="date" id="wd-due-date" defaultValue="2024-09-21" />
      //           <br/>
      //           <br />
      //           <label htmlFor="wd-available-from" style={{ marginRight: '35px' }}>Available From</label>
      //           <label htmlFor="wd-available-from">Until</label>
      //           <br/>
      //           <input type="date" id="wd-available-from" defaultValue="2024-09-21" style={{ marginRight: '20px' }}/>
      //           <input type="date" id="wd-available-to" defaultValue="2024-09-21" />
      //       </td>
      //     </tr>
      //     <br />
      //     <tr>
      //   <td colSpan={2}>
      //       <hr />
      //   </td>
      //   </tr>
      //     <tr>
      //       <td></td>
      //       <td align= "right">
      //           <Link id="wd-course-assignment-link"  to="/Kanbas/Courses/1234/Assignments"><button>Cancel</button></Link> &nbsp;
      //           <Link id="wd-course-assignment-link"  to="/Kanbas/Courses/1234/Assignments"><button>Save</button></Link><br/>
      //       </td>
      //     </tr>
      //     <br /> 
      //   </table>
      // </div>
  );}
  