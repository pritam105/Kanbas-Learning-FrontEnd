import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input id="wd-username" className="form-control mb-2" value="pritam105" placeholder="username"/>
      <input id="wd-password" className="form-control mb-2" value="123" placeholder="password" type="password"/>
      <input id="wd-firstname" className="form-control mb-2" value="Pritam Anand" placeholder="First Name"/>
      <input id="wd-lastname" className="form-control mb-2" value="Mane" placeholder="Last Name"/>
      <input id="wd-dob" className="form-control mb-2" value="1999-04-01" type="date"/>
      <input id="wd-email" className="form-control mb-2" value="mane.prit@northeastern.edu" type="email"/>
      <select id="wd-role" className="form-control mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link to="/Kanbas/Account/Signin" className="btn btn-primary w-100" style={{ background: "red" }}>
        Sign out
      </Link>
    </div>
  );
}