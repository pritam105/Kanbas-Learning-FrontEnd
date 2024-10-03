import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./navigation";
import Courses from "./Courses";
import "./styles.css";

export default function Kanbas() {
    return (
      <div className= "d-flex" id="wd-kanbas">
            <KanbasNavigation />
          <div className="flex-fill wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Courses/:cid/*" element={<Courses />} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />                
            </Routes>
          </div>
      </div>
  );}
  