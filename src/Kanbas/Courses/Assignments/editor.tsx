export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page to the web application
          running on Netlify. the landing page should include the following: 
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignments</label>
            </td>
            <td>
                <select id="wd-group">
                    <option value="Quiz">Quiz</option>
                    <option value="Tests">Test</option>
                    <option selected value="Assignments">
                        Assignments
                    </option>
                </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option value="RawScore">Raw Score</option>
                    <option value="Class">Class</option>
                    <option selected value="Percentage">
                        Percentage
                    </option>
                </select>
            </td>
          </tr>
          <br />                   
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option value="Offline">Offline</option>
                    <option selected value="Online">
                        Online
                    </option>
                </select>
            </td>
          </tr>
          <br />
          <tr>
            <td></td>
            <td>
                <label>Online Entry Options</label>
                <br />
                <input type="checkbox" name="check-genre" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label>
                <br />
                <input type="checkbox" name="check-genre" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label>
                <br />      
                <input type="checkbox" name="check-genre" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label>
                <br />
                <input type="checkbox" name="check-genre" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotations</label>                            
                <br />
                <input type="checkbox" name="check-genre" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label>                            
            </td>
         </tr>
         <br />                   
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" value={"Everyone"} />
            </td>
          </tr>
          <br /> 
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
                <input type="date" id="wd-due-date" defaultValue="2024-09-21" />
            </td>
          </tr>
          <br /> 
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
                <input type="date" id="wd-available-from" defaultValue="2024-09-21" />
                <label htmlFor="wd-available-to">Until</label>
                <input type="date" id="wd-available-to" defaultValue="2024-09-21" />
            </td>
          </tr>          
        </table>
      </div>
  );}
  