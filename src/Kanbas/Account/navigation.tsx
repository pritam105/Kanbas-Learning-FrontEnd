import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const {pathname} = useLocation();
  const links = [
    { label: "Signin", path: "/Kanbas/Account/Signin" },
    { label: "Signup",   path: "/Kanbas/Account/Signup" },
    { label: "Profile",  path: "/Kanbas/Account/Profile" }
  ];
  return (
    <div id="wd-account-navigation" className="wd list-group fs-4 rounded-0 d-none d-sm-block">
      {links.map((link) => 
         (<Link key={link.label} to={link.path}
        className={`list-group-item ${pathname.includes(link.label) ? "active" : "text-danger"} border border-0`}> {link.label}  </Link>
        ))}
    </div>
  );
}