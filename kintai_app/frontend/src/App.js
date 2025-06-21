// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage";
import Layout from "./components/Layout/Layout";

import DashboardPage from "./pages/user/DashboardPage";
import ClockInPage from "./pages/user/ClockInPage";
import AttendancePage from "./pages/user/AttendancePage";
import ClockEditPage from "./pages/user/ClockEditPage";

import HolidayApplicationPage from "./pages/user/application/HolidayApplicationPage";
import OvertimeApplicationPage from "./pages/user/application/OvertimeApplicationPage";
import HolidayWorkApplicationPage from "./pages/user/application/HolidayWorkApplicationPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ルートアクセスはログイン画面へリダイレクト */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ログイン画面 */}
        <Route path="/login" element={<LoginPage />} />

        {/* ログイン後のレイアウトでラップ */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clock-in" element={<ClockInPage />} />
          <Route path="/dashboard/attendance" element={<AttendancePage />} />
          <Route path="/dashboard/clock-edit" element={<ClockEditPage />} />

          {/* 申請関連 */}
          <Route path="/dashboard/application/holiday" element={<HolidayApplicationPage />} />
          <Route path="/dashboard/application/overtime" element={<OvertimeApplicationPage />} />
          <Route path="/dashboard/application/holiday-work" element={<HolidayWorkApplicationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

