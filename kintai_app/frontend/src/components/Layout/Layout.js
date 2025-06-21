import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Layout.css";
import { FaCalendarAlt, FaClock, FaFileAlt, FaCog } from "react-icons/fa";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <ul>
          <li className={location.pathname.startsWith("/dashboard/attendance") ? "active" : ""}>
            <FaCalendarAlt className="icon" />
            <Link to="/dashboard/attendance">出勤簿</Link>
          </li>
          <li className={location.pathname.startsWith("/dashboard/clock-edit") ? "active" : ""}>
            <FaClock className="icon" />
            <Link to="/dashboard/clock-edit">打刻修正</Link>
          </li>
          <li>
            <FaFileAlt className="icon" />
            申請
            <ul>
              <li><Link to="/dashboard/application/holiday">休暇申請</Link></li>
              <li><Link to="/dashboard/application/overtime">残業申請</Link></li>
              <li><Link to="/dashboard/application/holiday-work">休日出勤申請</Link></li>
            </ul>
          </li>
          <li className={location.pathname.startsWith("/dashboard/staff-settings") ? "active" : ""}>
            <FaCog className="icon" />
            <Link to="/dashboard/staff-settings">スタッフ設定</Link>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

