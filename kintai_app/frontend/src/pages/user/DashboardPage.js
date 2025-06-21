import React from "react";
import ClockInPage from "./ClockInPage";

const DashboardPage = () => {
  return (
    <div>
      <h1>勤怠管理ダッシュボード</h1>

      <section className="card">
        <h2>勤怠打刻</h2>
        <ClockInPage />
      </section>

      <section className="card">
        <h2>申請一覧</h2>
        {/* 他のコンテンツをここに */}
      </section>

      {/* 他のカードを追加可能 */}
    </div>
  );
};

export default DashboardPage;

