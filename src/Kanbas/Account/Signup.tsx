import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input id="wd-username" placeholder="username" className="form-control mb-2"/>
      <input id="wd-password" placeholder="password" className="form-control mb-2" type="password" />
      <input id="wd-password" placeholder="verify password" className="form-control mb-3" type="password" />
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mb-2"> Sign up </Link>
      <Link to="/Kanbas/Account/Signin" className="btn btn-primary w-100" >Sign in</Link>
    </div>
    );
}
